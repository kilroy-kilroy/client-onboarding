-- Add Authentication & Authorization
-- Migration: 002_add_authentication.sql
-- Created: 2025-11-17

-- ============================================
-- 1. Add user_id to companies table
-- ============================================
ALTER TABLE companies
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for faster lookups
CREATE INDEX idx_companies_user_id ON companies(user_id);

-- ============================================
-- 2. Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_gen_sales_process ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_capacity ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. Create RLS Policies
-- ============================================

-- Companies: Users can only see their own companies
CREATE POLICY "Users can view their own companies"
ON companies FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own companies"
ON companies FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own companies"
ON companies FOR UPDATE
USING (auth.uid() = user_id);

-- Leadership: Users can only access their company's data
CREATE POLICY "Users can view their company's leadership"
ON leadership_contacts FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = leadership_contacts.company_id
        AND companies.user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their company's leadership"
ON leadership_contacts FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = leadership_contacts.company_id
        AND companies.user_id = auth.uid()
    )
);

CREATE POLICY "Users can update their company's leadership"
ON leadership_contacts FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = leadership_contacts.company_id
        AND companies.user_id = auth.uid()
    )
);

-- Team Members
CREATE POLICY "Users can view their company's team"
ON team_members FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = team_members.company_id
        AND companies.user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their company's team"
ON team_members FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = team_members.company_id
        AND companies.user_id = auth.uid()
    )
);

-- Services
CREATE POLICY "Users can view their company's services"
ON services FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = services.company_id
        AND companies.user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their company's services"
ON services FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = services.company_id
        AND companies.user_id = auth.uid()
    )
);

-- Clients
CREATE POLICY "Users can view their company's clients"
ON clients FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = clients.company_id
        AND companies.user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their company's clients"
ON clients FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = clients.company_id
        AND companies.user_id = auth.uid()
    )
);

-- Financials
CREATE POLICY "Users can view their company's financials"
ON financials FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = financials.company_id
        AND companies.user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their company's financials"
ON financials FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = financials.company_id
        AND companies.user_id = auth.uid()
    )
);

-- Sales Process
CREATE POLICY "Users can view their company's sales process"
ON lead_gen_sales_process FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = lead_gen_sales_process.company_id
        AND companies.user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their company's sales process"
ON lead_gen_sales_process FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = lead_gen_sales_process.company_id
        AND companies.user_id = auth.uid()
    )
);

-- Ops Capacity
CREATE POLICY "Users can view their company's ops capacity"
ON ops_capacity FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = ops_capacity.company_id
        AND companies.user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their company's ops capacity"
ON ops_capacity FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = ops_capacity.company_id
        AND companies.user_id = auth.uid()
    )
);

-- Competitors
CREATE POLICY "Users can view their company's competitors"
ON competitors FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = competitors.company_id
        AND companies.user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their company's competitors"
ON competitors FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM companies
        WHERE companies.id = competitors.company_id
        AND companies.user_id = auth.uid()
    )
);
