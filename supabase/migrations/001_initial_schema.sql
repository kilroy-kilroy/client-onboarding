-- WTF Agency Intelligence System - Database Schema
-- Supabase PostgreSQL Migration
-- Created: 2025-11-17

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. COMPANIES TABLE (Primary/Core)
-- ============================================
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    url TEXT,
    industry_niche TEXT,
    hq_location TEXT,
    founded INTEGER,
    team_size INTEGER,
    revenue_range TEXT CHECK (revenue_range IN (
        'Under $500k',
        '$500k-$1M',
        '$1M-$2M',
        '$2M-$5M',
        '$5M-$10M',
        '$10M+'
    )),
    ideal_client_fit_score DECIMAL(3,2), -- Calculated field
    sales_health_score DECIMAL(3,2), -- Calculated field
    ops_health_score DECIMAL(3,2), -- Calculated field
    overall_wtf_health_score DECIMAL(3,2), -- Calculated field
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. LEADERSHIP CONTACTS
-- ============================================
CREATE TABLE leadership_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN (
        'CEO',
        'Founder',
        'Co-Founder',
        'CRO',
        'COO',
        'CMO',
        'Partner',
        'VP Sales',
        'VP Operations',
        'Other'
    )),
    email TEXT,
    linkedin_url TEXT,
    is_decision_maker BOOLEAN DEFAULT false,
    personality_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. TEAM MEMBERS
-- ============================================
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT CHECK (role IN (
        'Account Manager',
        'Media Buyer',
        'Designer',
        'Developer',
        'Copywriter',
        'Strategist',
        'Project Manager',
        'Analytics Specialist',
        'SEO Specialist',
        'Social Media Manager',
        'Other'
    )),
    linkedin_url TEXT,
    strengths_notes TEXT,
    capacity_contribution_score INTEGER CHECK (capacity_contribution_score BETWEEN 1 AND 10),
    reports_to_id UUID REFERENCES leadership_contacts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. SERVICES
-- ============================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL,
    description TEXT,
    price_range TEXT,
    delivery_model TEXT CHECK (delivery_model IN (
        'Retainer',
        'Project',
        'Hybrid',
        'Performance',
        'Other'
    )),
    delivery_constraints TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. CLIENTS
-- ============================================
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    industry TEXT,
    monthly_value DECIMAL(10,2),
    profitability_rating TEXT CHECK (profitability_rating IN ('Low', 'Medium', 'High')),
    fit_rating INTEGER CHECK (fit_rating BETWEEN 1 AND 10),
    duration_months INTEGER,
    churn_risk TEXT CHECK (churn_risk IN ('Low', 'Medium', 'High')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction table for many-to-many relationship between clients and services
CREATE TABLE client_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(client_id, service_id)
);

-- ============================================
-- 6. FINANCIALS
-- ============================================
CREATE TABLE financials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    month DATE NOT NULL,
    revenue DECIMAL(12,2),
    cost_of_delivery DECIMAL(12,2),
    gross_margin_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE
            WHEN revenue > 0 THEN ((revenue - cost_of_delivery) / revenue * 100)
            ELSE 0
        END
    ) STORED,
    operating_costs DECIMAL(12,2),
    net_profit_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE
            WHEN revenue > 0 THEN ((revenue - cost_of_delivery - operating_costs) / revenue * 100)
            ELSE 0
        END
    ) STORED,
    target_revenue_goal DECIMAL(12,2),
    target_profit_goal DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, month)
);

-- ============================================
-- 7. SALES ASSETS
-- ============================================
CREATE TABLE sales_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    asset_name TEXT NOT NULL,
    asset_type TEXT CHECK (asset_type IN (
        'Deck',
        'Proposal',
        'Case Study',
        'One-pager',
        'SOP',
        'Email Template',
        'Script',
        'Other'
    )),
    file_url TEXT,
    last_updated DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. LEAD GEN & SALES PROCESS
-- ============================================
CREATE TABLE lead_gen_sales_process (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    main_lead_sources TEXT[], -- Array of sources
    monthly_lead_volume INTEGER,
    request_to_meeting_rate DECIMAL(5,2),
    meeting_to_proposal_rate DECIMAL(5,2),
    proposal_to_close_rate DECIMAL(5,2),
    sales_process_description TEXT,
    outbound_tools TEXT[], -- Array of tools
    sales_positioning_summary TEXT,
    visibility_score INTEGER CHECK (visibility_score BETWEEN 1 AND 10),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id) -- One record per company
);

-- ============================================
-- 9. OPS & CAPACITY
-- ============================================
CREATE TABLE ops_capacity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    hours_available_per_week DECIMAL(6,2),
    hours_sold_per_week DECIMAL(6,2),
    utilization_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE
            WHEN hours_available_per_week > 0 THEN (hours_sold_per_week / hours_available_per_week * 100)
            ELSE 0
        END
    ) STORED,
    biggest_bottlenecks TEXT,
    delivery_model TEXT,
    sop_quality_rating INTEGER CHECK (sop_quality_rating BETWEEN 1 AND 10),
    team_capacity_risk TEXT CHECK (team_capacity_risk IN ('Low', 'Medium', 'High')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id) -- One record per company
);

-- ============================================
-- 10. COMPETITORS
-- ============================================
CREATE TABLE competitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    competitor_name TEXT NOT NULL,
    url TEXT,
    positioning_summary TEXT,
    strengths TEXT,
    weaknesses TEXT,
    differentiation_opportunities TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_leadership_contacts_company ON leadership_contacts(company_id);
CREATE INDEX idx_team_members_company ON team_members(company_id);
CREATE INDEX idx_clients_company ON clients(company_id);
CREATE INDEX idx_services_company ON services(company_id);
CREATE INDEX idx_financials_company ON financials(company_id);
CREATE INDEX idx_financials_month ON financials(month);
CREATE INDEX idx_sales_assets_company ON sales_assets(company_id);
CREATE INDEX idx_competitors_company ON competitors(company_id);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leadership_contacts_updated_at BEFORE UPDATE ON leadership_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financials_updated_at BEFORE UPDATE ON financials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sales_assets_updated_at BEFORE UPDATE ON sales_assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lead_gen_sales_process_updated_at BEFORE UPDATE ON lead_gen_sales_process FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ops_capacity_updated_at BEFORE UPDATE ON ops_capacity FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_competitors_updated_at BEFORE UPDATE ON competitors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Basic Setup
-- ============================================
-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_gen_sales_process ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_capacity ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;

-- Create policies (allow authenticated users full access for now)
-- You can refine these later based on user roles
CREATE POLICY "Enable all access for authenticated users" ON companies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON leadership_contacts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON client_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON financials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON sales_assets FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON lead_gen_sales_process FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON ops_capacity FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON competitors FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- VIEWS FOR CALCULATED SCORES
-- ============================================

-- View: Company Health Scores
CREATE OR REPLACE VIEW company_health_scores AS
SELECT
    c.id,
    c.company_name,
    -- Ideal Client Fit Score (average fit rating of clients)
    COALESCE(AVG(cl.fit_rating), 0)::DECIMAL(3,2) as ideal_client_fit_score,
    -- Sales Health Score (based on conversion rates)
    COALESCE(
        (lg.request_to_meeting_rate + lg.meeting_to_proposal_rate + lg.proposal_to_close_rate) / 30,
        0
    )::DECIMAL(3,2) as sales_health_score,
    -- Ops Health Score (based on utilization and SOP quality)
    COALESCE(
        (oc.utilization_percentage / 10 + oc.sop_quality_rating) / 2,
        0
    )::DECIMAL(3,2) as ops_health_score
FROM companies c
LEFT JOIN clients cl ON c.id = cl.company_id
LEFT JOIN lead_gen_sales_process lg ON c.id = lg.company_id
LEFT JOIN ops_capacity oc ON c.id = oc.company_id
GROUP BY c.id, c.company_name, lg.request_to_meeting_rate, lg.meeting_to_proposal_rate,
         lg.proposal_to_close_rate, oc.utilization_percentage, oc.sop_quality_rating;

-- View: Company Overview (for dashboard)
CREATE OR REPLACE VIEW company_overview AS
SELECT
    c.*,
    chs.ideal_client_fit_score,
    chs.sales_health_score,
    chs.ops_health_score,
    (chs.ideal_client_fit_score + chs.sales_health_score + chs.ops_health_score) / 3 as overall_wtf_health_score,
    COUNT(DISTINCT cl.id) as total_clients,
    COUNT(DISTINCT lc.id) as total_leadership,
    COUNT(DISTINCT tm.id) as total_team_members,
    COUNT(DISTINCT s.id) as total_services
FROM companies c
LEFT JOIN company_health_scores chs ON c.id = chs.id
LEFT JOIN clients cl ON c.id = cl.company_id
LEFT JOIN leadership_contacts lc ON c.id = lc.company_id
LEFT JOIN team_members tm ON c.id = tm.company_id
LEFT JOIN services s ON c.id = s.company_id
GROUP BY c.id, c.company_name, c.url, c.industry_niche, c.hq_location, c.founded,
         c.team_size, c.revenue_range, c.ideal_client_fit_score, c.sales_health_score,
         c.ops_health_score, c.overall_wtf_health_score, c.notes, c.created_at, c.updated_at,
         chs.ideal_client_fit_score, chs.sales_health_score, chs.ops_health_score;

COMMENT ON TABLE companies IS 'Core table representing agency clients';
COMMENT ON TABLE leadership_contacts IS 'Decision makers and leadership at each agency';
COMMENT ON TABLE team_members IS 'Team members working at each agency';
COMMENT ON TABLE services IS 'Services offered by each agency';
COMMENT ON TABLE clients IS 'End clients of each agency';
COMMENT ON TABLE financials IS 'Monthly financial data for each agency';
COMMENT ON TABLE sales_assets IS 'Sales and marketing materials';
COMMENT ON TABLE lead_gen_sales_process IS 'Lead generation and sales pipeline data';
COMMENT ON TABLE ops_capacity IS 'Operational capacity and delivery metrics';
COMMENT ON TABLE competitors IS 'Competitive landscape for each agency';
