# WTF Agency Intelligence System

A unified agency intelligence platform that creates structured onboarding, builds a relational database of your entire business, and feeds all downstream tools (Roadmap, DemandOS, GEN+, FYFS, GTM OS, etc).

## What This System Does

**The unified intelligence layer** that sits beneath all your strategic frameworks:

1. **Replaces scattered onboarding** with a guided, repeatable intake process
2. **Creates a relational database** representing the complete operational reality of an agency
3. **Feeds every downstream program** - Roadmap, DemandOS, GEN+, FYFS, GTM OS, CallLab, Positioning, ICPs
4. **Generates automated analysis** and Agency Snapshots
5. **Eliminates redundant data collection** across all your frameworks

This is the **operating system behind the WTF Agency Method**.

---

## Tech Stack

- **Frontend**: Next.js 14 (React, TypeScript, Tailwind CSS)
- **Backend**: Supabase (PostgreSQL database + auto-generated REST API)
- **Hosting**:
  - Frontend: Vercel
  - Backend/Database: Supabase
- **AI Analysis**: Anthropic Claude API (optional)

---

## Database Schema

### 11 Core Tables

1. **Companies** - Core agency information
2. **Leadership Contacts** - Decision makers and stakeholders
3. **Team Members** - Delivery team and roles
4. **Services** - Service offerings and delivery models
5. **Clients** - End client portfolio
6. **Financials** - Monthly revenue, costs, margins
7. **Sales Assets** - Decks, proposals, case studies
8. **Lead Gen & Sales Process** - Pipeline metrics and conversion rates
9. **Ops & Capacity** - Utilization, bottlenecks, SOPs
10. **Competitors** - Competitive landscape
11. **Social and Content** - Links to company linkedin page, founder's & key staff linkedin pages, link to any blogs, newsletters, you tube, podcasts, instagram, facebook, tiktok, etc used to promote the company

### Views

- **company_health_scores** - Calculated health metrics
- **company_overview** - Complete dashboard data

See `supabase/migrations/001_initial_schema.sql` for full schema.

---

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier works)
- (Optional) Anthropic API key for AI analysis

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd client-onbarding

# Install dependencies
npm install
```

### Step 2: Set Up Supabase

1. **Create a new Supabase project**:
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose a name, database password, and region
   - Wait for the project to be provisioned

2. **Run the database migration**:
   - In Supabase dashboard, go to **SQL Editor**
   - Click "New Query"
   - Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and click "Run"
   - Verify all tables were created successfully

3. **Get your API credentials**:
   - Go to **Project Settings** → **API**
   - Copy:
     - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
     - `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
     - `service_role` key (SUPABASE_SERVICE_ROLE_KEY) - ⚠️ Keep this secret!

### Step 3: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit .env.local and add your credentials:
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: For AI analysis
ANTHROPIC_API_KEY=your-anthropic-api-key
```

### Step 4: Run Locally

```bash
# Start the development server
npm run dev

# Open your browser to:
# http://localhost:3000
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**:
```bash
git add .
git commit -m "Initial WTF Agency Intelligence System"
git push origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `ANTHROPIC_API_KEY` (optional)
   - Click "Deploy"

3. **Your app is live!**
   - Vercel will give you a URL like `your-app.vercel.app`
   - You can configure a custom domain in Vercel settings

---

## Usage

### 1. Onboarding Flow

Navigate to `/onboarding` to start the guided intake process:

1. **Company Basics** - Core agency information
2. **Leadership Team** - Decision makers
3. **Team Members** - Delivery team
4. **Services & Offers** - What you sell
5. **Client Portfolio** - Current clients
6. **Financials** - Revenue and costs
7. **Sales & Lead Gen** - Pipeline metrics
8. **Operations** - Capacity and constraints
9. **Competitors** - Competitive landscape
10. **Review & Submit** - Confirm and create profile

### 2. Dashboard

After onboarding, view the Agency Snapshot at `/dashboard/[companyId]`:

- **WTF Health Scores** - Overall, Client Fit, Sales, Ops
- **Company Overview** - Key metrics and data
- **Portfolio Stats** - Clients, services, team
- **Next Actions** - Recommended steps

### 3. API Integration

The system exposes a REST API through Supabase that can be integrated into:

- Roadmap generation tools
- GEN+ social authority systems
- FYFS CallLab inputs
- GTM OS outbound platforms
- Positioning generators
- ICP builders

**Example API call**:

```typescript
import { supabase } from '@/lib/supabase/client'

// Get company overview
const { data, error } = await supabase
  .from('company_overview')
  .select('*')
  .eq('id', companyId)
  .single()
```

---

## Database Schema Reference

### Key Relationships

```
companies (1) ←→ (many) leadership_contacts
companies (1) ←→ (many) team_members
companies (1) ←→ (many) services
companies (1) ←→ (many) clients
companies (1) ←→ (many) financials
companies (1) ←→ (1) lead_gen_sales_process
companies (1) ←→ (1) ops_capacity
companies (1) ←→ (many) competitors

clients (many) ←→ (many) services (via client_services junction table)
team_members (many) ←→ (1) leadership_contacts (reports_to)
```

### Calculated Fields

The database automatically calculates:

- **Gross Margin %** = (Revenue - Cost of Delivery) / Revenue × 100
- **Net Profit %** = (Revenue - Costs - Operating Costs) / Revenue × 100
- **Utilization %** = Hours Sold / Hours Available × 100
- **Health Scores** = Weighted formulas based on multiple factors

---

## Next Steps & Roadmap

### Phase 1: Foundation (Current)
- ✅ Database schema
- ✅ Basic onboarding flow
- ✅ Simple dashboard
- ✅ API endpoints

### Phase 2: Enhanced Onboarding (Next)
- [ ] Complete all step forms with full validation
- [ ] File upload for sales assets
- [ ] Drag-and-drop prioritization
- [ ] Save and resume onboarding

### Phase 3: Intelligence & Analysis
- [ ] AI-powered Agency Snapshot generation
- [ ] Automated Go Forward Plan creation
- [ ] Competitive analysis using Claude
- [ ] Positioning statement generator
- [ ] ICP builder with recommendations

### Phase 4: Program Integration
- [ ] Roadmap generator integration
- [ ] GEN+ content feed
- [ ] FYFS CallLab inputs
- [ ] DemandOS pipeline sync
- [ ] GTM OS outbound automation

### Phase 5: Advanced Features
- [ ] Multi-company management
- [ ] Time-series analytics
- [ ] Benchmarking across agencies
- [ ] Exportable reports (PDF, DOCX)
- [ ] Slack/Discord notifications

---

## File Structure

```
client-onbarding/
├── src/
│   ├── app/                       # Next.js app directory
│   │   ├── api/                   # API routes
│   │   │   └── onboarding/
│   │   │       └── submit/
│   │   │           └── route.ts   # Onboarding submission endpoint
│   │   ├── dashboard/             # Dashboard pages
│   │   │   ├── [companyId]/       # Individual company dashboard
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx           # Dashboard list
│   │   ├── onboarding/            # Onboarding flow
│   │   │   └── page.tsx
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── components/                # React components
│   │   └── onboarding/
│   │       ├── OnboardingWizard.tsx
│   │       ├── ProgressBar.tsx
│   │       ├── FormNavigation.tsx
│   │       └── steps/             # Individual step components
│   │           ├── CompanyBasicsStep.tsx
│   │           ├── LeadershipStep.tsx
│   │           ├── TeamStep.tsx
│   │           ├── ServicesStep.tsx
│   │           ├── ClientsStep.tsx
│   │           ├── FinancialsStep.tsx
│   │           ├── SalesProcessStep.tsx
│   │           ├── OpsCapacityStep.tsx
│   │           ├── CompetitorsStep.tsx
│   │           └── ReviewStep.tsx
│   ├── lib/                       # Utilities
│   │   └── supabase/
│   │       ├── client.ts          # Client-side Supabase
│   │       └── server.ts          # Server-side Supabase
│   └── types/                     # TypeScript types
│       ├── database.ts            # Database types
│       └── onboarding.ts          # Onboarding form types
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # Database schema
├── .env.local.example             # Environment variables template
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── README.md
```

---

## Troubleshooting

### Common Issues

**1. "Missing Supabase environment variables"**
- Make sure `.env.local` exists and has all required variables
- Restart your dev server after adding env vars

**2. "Failed to create company"**
- Check that your Supabase migration ran successfully
- Verify your `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check Supabase logs in the dashboard

**3. Row Level Security (RLS) errors**
- The schema includes permissive RLS policies for authenticated users
- If you need to customize, modify the policies in the SQL migration

**4. TypeScript errors**
- Run `npm run type-check` to see all type errors
- Regenerate database types if schema changes:
  ```bash
  npx supabase gen types typescript --project-id your-project-id > src/types/database.ts
  ```

---

## Support & Contributing

This is the foundation of the **WTF Agency Intelligence System**.

For questions, issues, or feature requests:
1. Check the troubleshooting section
2. Review Supabase documentation
3. Open an issue in the repository

---

## License

Proprietary - WTF Agency Method

---

**Built with:**
- Next.js 14
- Supabase (PostgreSQL)
- TypeScript
- Tailwind CSS
- React Hook Form
- Anthropic Claude API

**The brain that powers your entire coaching and consulting ecosystem.**
