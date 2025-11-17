# Architecture Documentation

## System Architecture Overview

The WTF Agency Intelligence System follows a modern serverless architecture with a clear separation between frontend and backend concerns.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         End Users                           │
│                  (Agency Owners, Consultants)               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                       │
│                    (Global CDN + SSL)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                  Next.js 14 Application                      │
│                    (React + TypeScript)                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │  API Routes  │      │
│  │              │  │              │  │              │      │
│  │ • Home       │  │ • Wizard     │  │ • Submit     │      │
│  │ • Onboarding │  │ • Progress   │  │ • Analyze    │      │
│  │ • Dashboard  │  │ • Forms      │  │ • Export     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   Supabase Backend                           │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            PostgreSQL Database                       │   │
│  │  • 10 Core Tables                                    │   │
│  │  • Calculated Views                                  │   │
│  │  • Row Level Security                                │   │
│  │  • Auto-generated REST API                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Auth & Security                           │   │
│  │  • JWT-based authentication                          │   │
│  │  • RLS policies                                      │   │
│  │  • API key management                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Storage (Optional)                        │   │
│  │  • Sales assets (PDFs, decks)                        │   │
│  │  • Case studies                                      │   │
│  │  • Documents                                         │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│               External Integrations (Future)                 │
│                                                              │
│  • Anthropic Claude API (AI Analysis)                       │
│  • Roadmap Generator                                        │
│  • GEN+ Content System                                      │
│  • FYFS CallLab                                             │
│  • DemandOS                                                 │
│  • GTM OS                                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Onboarding Flow

```
User fills form → React State → Multi-step wizard → API Route
                                                         ↓
                                                    Validation
                                                         ↓
                                              Supabase Insert
                                                         ↓
                                              Transaction:
                                              1. Create company
                                              2. Create leadership
                                              3. Create team
                                              4. Create services
                                              5. Create clients
                                              6. etc.
                                                         ↓
                                              Return company_id
                                                         ↓
                                              Redirect to dashboard
```

### Dashboard Data Flow

```
User requests dashboard → Next.js Server Component
                                     ↓
                          Query Supabase Views
                          (company_overview)
                                     ↓
                          Calculate health scores
                          (done in database)
                                     ↓
                          Render dashboard
                                     ↓
                          Send to client
```

---

## Database Schema Architecture

### Core Entities

```
companies (central hub)
    ↓
    ├── leadership_contacts (1:many)
    ├── team_members (1:many)
    │       └── reports_to → leadership_contacts
    ├── services (1:many)
    ├── clients (1:many)
    │       └── client_services → services (many:many)
    ├── financials (1:many, time-series)
    ├── sales_assets (1:many)
    ├── lead_gen_sales_process (1:1)
    ├── ops_capacity (1:1)
    └── competitors (1:many)
```

### Calculated Views

**company_health_scores**:
- Aggregates data from multiple tables
- Calculates: ideal_client_fit_score, sales_health_score, ops_health_score

**company_overview**:
- Joins all related data
- Single query for dashboard
- Includes counts and aggregations

---

## Component Architecture

### Frontend Component Hierarchy

```
App Layout
└── Page
    ├── OnboardingWizard
    │   ├── ProgressBar
    │   ├── Step Components
    │   │   ├── CompanyBasicsStep
    │   │   ├── LeadershipStep
    │   │   ├── TeamStep
    │   │   ├── ServicesStep
    │   │   ├── ClientsStep
    │   │   ├── FinancialsStep
    │   │   ├── SalesProcessStep
    │   │   ├── OpsCapacityStep
    │   │   ├── CompetitorsStep
    │   │   └── ReviewStep
    │   └── FormNavigation
    │
    └── Dashboard
        ├── HealthScoreCards
        ├── CompanyOverview
        ├── PortfolioStats
        └── NextActions
```

### State Management

- **Client-side state**: React `useState` for form data
- **Server state**: Supabase real-time subscriptions (future)
- **Form validation**: React Hook Form + Zod (future enhancement)

---

## API Architecture

### REST API Endpoints

All generated automatically by Supabase from database schema:

**Base URL**: `https://your-project.supabase.co/rest/v1/`

**Tables** (auto-generated CRUD):
- `GET /companies` - List companies
- `POST /companies` - Create company
- `GET /companies?id=eq.{id}` - Get specific company
- `PATCH /companies?id=eq.{id}` - Update company
- `DELETE /companies?id=eq.{id}` - Delete company

**Views**:
- `GET /company_overview` - Dashboard data
- `GET /company_health_scores` - Health metrics

**Custom API Routes** (Next.js):
- `POST /api/onboarding/submit` - Submit full onboarding data
- `POST /api/analysis/generate` - Generate AI analysis (future)
- `GET /api/export/{companyId}` - Export data (future)

### Authentication Flow

```
User → Next.js Client → Supabase Auth
                              ↓
                        JWT Token
                              ↓
                        Stored in Cookie
                              ↓
                        Sent with requests
                              ↓
                        Validated by RLS
```

---

## Security Architecture

### Multi-Layer Security

**1. Row Level Security (RLS)**:
```sql
-- Example policy
CREATE POLICY "Users can only see their own companies"
ON companies FOR SELECT
USING (auth.uid() = user_id);
```

**2. API Key Tiers**:
- `anon` key - Client-side, restricted by RLS
- `service_role` key - Server-side only, bypasses RLS

**3. Environment Variables**:
- Client: `NEXT_PUBLIC_*` - safe to expose
- Server: `SUPABASE_SERVICE_ROLE_KEY` - never exposed

**4. HTTPS Everywhere**:
- Vercel enforces HTTPS
- Supabase requires HTTPS

---

## Performance Optimizations

### Database Level

1. **Indexes**:
   ```sql
   CREATE INDEX idx_leadership_contacts_company ON leadership_contacts(company_id);
   CREATE INDEX idx_clients_company ON clients(company_id);
   -- etc. for all foreign keys
   ```

2. **Materialized Views** (future):
   - Pre-calculate expensive aggregations
   - Refresh on data changes

3. **Generated Columns**:
   ```sql
   gross_margin_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
       CASE WHEN revenue > 0 THEN ((revenue - cost_of_delivery) / revenue * 100)
       ELSE 0 END
   ) STORED
   ```

### Application Level

1. **React Server Components**:
   - Fetch data on server
   - Reduce client bundle size

2. **Next.js Image Optimization**:
   - Automatic WebP conversion
   - Lazy loading

3. **Static Generation**:
   - Homepage is static
   - Dashboard is server-rendered

4. **API Route Caching**:
   ```typescript
   export const revalidate = 60 // Revalidate every 60 seconds
   ```

---

## Scalability Considerations

### Current Capacity

- **Database**: Up to 500MB on free tier
- **Bandwidth**: 5GB/month on free tier
- **Concurrent connections**: 60 on free tier

### Scaling Path

**Phase 1: Optimize Current Setup**
- Add database indexes
- Enable Supabase connection pooling
- Use Vercel Edge Functions

**Phase 2: Supabase Pro Plan**
- 8GB database
- Unlimited API requests
- Daily backups

**Phase 3: Enterprise**
- Dedicated database
- Custom domains
- SLA guarantees

---

## Monitoring & Observability

### Built-in Monitoring

**Vercel**:
- Real-time function logs
- Analytics dashboard
- Error tracking

**Supabase**:
- API logs
- Database logs
- Query performance

### Recommended Add-ons

1. **Sentry** - Error tracking
2. **LogRocket** - Session replay
3. **PostHog** - Product analytics
4. **Datadog** - Infrastructure monitoring

---

## Deployment Architecture

### Development Environment

```
Local Machine
    ↓
npm run dev → localhost:3000
    ↓
.env.local (Supabase credentials)
    ↓
Development Supabase Project
```

### Production Environment

```
GitHub Repository
    ↓
Push to main
    ↓
Vercel Auto-Deploy
    ↓
Build Next.js App
    ↓
Deploy to Edge Network
    ↓
Production Supabase Project
```

### CI/CD Pipeline

```
1. Developer pushes code
2. GitHub Actions (optional)
   - Run tests
   - Run linter
   - Type check
3. Vercel deployment
   - Install dependencies
   - Build app
   - Deploy to preview URL
4. Manual promotion to production
```

---

## Technology Stack Details

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form (future)
- **Validation**: Zod (future)
- **State**: React Hooks

### Backend

- **Database**: PostgreSQL (via Supabase)
- **ORM**: Supabase Client (auto-generated)
- **API**: REST (auto-generated by Supabase)
- **Auth**: Supabase Auth (JWT)

### Infrastructure

- **Hosting**: Vercel (serverless)
- **Database**: Supabase (managed)
- **CDN**: Vercel Edge Network
- **SSL**: Automatic (Let's Encrypt)

### Development

- **Package Manager**: npm
- **Version Control**: Git
- **Code Editor**: VS Code (recommended)
- **Database GUI**: Supabase Studio

---

## Future Architecture Enhancements

### Phase 1: Real-time Features
- WebSocket connections via Supabase Realtime
- Live dashboard updates
- Collaborative editing

### Phase 2: Microservices
- Separate AI analysis service
- Report generation service
- Email notification service

### Phase 3: Multi-tenancy
- Organization-level isolation
- Team collaboration
- Permission management

### Phase 4: Data Pipeline
- ETL jobs for analytics
- Data warehouse integration
- Predictive analytics

---

## Architecture Decisions (ADRs)

### Why Supabase over custom backend?

**Pros**:
- Auto-generated API saves development time
- Built-in auth and RLS
- Real-time subscriptions
- Automatic backups
- Free tier for prototyping

**Cons**:
- Vendor lock-in
- Limited customization
- PostgreSQL-only

**Decision**: Use Supabase for MVP, evaluate migration later if needed

### Why Next.js over React SPA?

**Pros**:
- Server-side rendering for better SEO
- API routes eliminate separate backend
- Better performance
- Image optimization

**Cons**:
- More complex than SPA
- Learning curve

**Decision**: Use Next.js for full-stack capabilities

### Why TypeScript over JavaScript?

**Pros**:
- Type safety catches bugs early
- Better IDE support
- Self-documenting code
- Easier refactoring

**Cons**:
- Longer initial setup
- Learning curve

**Decision**: TypeScript for maintainability

---

**Architecture Version**: 1.0
**Last Updated**: 2025-11-17
