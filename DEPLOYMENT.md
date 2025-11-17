# Deployment Guide - WTF Agency Intelligence System

This guide walks you through deploying the WTF Agency Intelligence System to production.

---

## Overview

**Architecture:**
- **Frontend**: Deployed to Vercel (serverless Next.js)
- **Backend/Database**: Supabase (managed PostgreSQL + auto API)
- **Files**: Supabase Storage (optional, for sales assets)

**Why this stack?**
- Zero DevOps overhead
- Automatic scaling
- Built-in authentication
- Global CDN
- Free tier available

---

## Prerequisites Checklist

Before deploying, ensure you have:

- [ ] Supabase account and project created
- [ ] Vercel account (can sign up with GitHub)
- [ ] GitHub repository with your code
- [ ] Database migration run successfully
- [ ] Environment variables documented

---

## Step 1: Supabase Setup (Backend)

### 1.1 Create Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `wtf-agency-intelligence` (or your choice)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Plan**: Free tier works for getting started
4. Click **"Create new project"**
5. Wait 2-3 minutes for provisioning

### 1.2 Run Database Migration

1. In your Supabase dashboard, navigate to **"SQL Editor"**
2. Click **"New Query"**
3. Open `supabase/migrations/001_initial_schema.sql` from your local project
4. Copy the entire file contents
5. Paste into the SQL Editor
6. Click **"Run"** (bottom right)
7. Verify success message: "Success. No rows returned"

### 1.3 Verify Tables Created

1. Navigate to **"Table Editor"** in Supabase
2. You should see 10 tables:
   - companies
   - leadership_contacts
   - team_members
   - services
   - clients
   - client_services
   - financials
   - sales_assets
   - lead_gen_sales_process
   - ops_capacity
   - competitors

3. Click on any table to verify the schema

### 1.4 Get API Credentials

1. Go to **"Project Settings"** → **"API"**
2. Copy the following values (you'll need them for Vercel):
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhb...
   service_role key: eyJhb...
   ```

⚠️ **IMPORTANT**: Never commit the `service_role` key to Git!

### 1.5 Configure Authentication (Optional)

If you want user authentication:

1. Go to **"Authentication"** → **"Providers"**
2. Enable providers (Email, Google, GitHub, etc.)
3. Configure redirect URLs:
   ```
   https://your-domain.vercel.app/auth/callback
   http://localhost:3000/auth/callback (for development)
   ```

---

## Step 2: Vercel Deployment (Frontend)

### 2.1 Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: WTF Agency Intelligence System"

# Create a new GitHub repository, then:
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

### 2.2 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click **"Add New Project"**
4. **"Import Git Repository"**
5. Select your repository from the list
6. If not visible, click **"Adjust GitHub App Permissions"** and grant access

### 2.3 Configure Project

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: `./` (unless you have a monorepo)

**Build and Output Settings**:
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

**Environment Variables**:

Click **"Environment Variables"** and add:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhb...` (anon key) | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhb...` (service role key) | Production only |
| `ANTHROPIC_API_KEY` | `sk-ant-...` (optional) | Production only |

⚠️ **Security Note**: Only add `SUPABASE_SERVICE_ROLE_KEY` to Production environment!

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait 1-3 minutes for build and deployment
3. Vercel will show:
   ```
   ✓ Build successful
   ✓ Deployment ready
   ```
4. Click **"Visit"** to see your live site

### 2.5 Configure Custom Domain (Optional)

1. In Vercel project settings → **"Domains"**
2. Add your custom domain (e.g., `intelligence.wtfagency.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic, ~1 minute)

---

## Step 3: Post-Deployment Verification

### 3.1 Test Onboarding Flow

1. Visit your deployed URL: `https://your-app.vercel.app`
2. Click **"Start Onboarding"**
3. Fill out the first step (Company Basics)
4. Click **"Next"** to verify navigation works
5. Complete a test submission

### 3.2 Verify Database Insert

1. Go to Supabase → **"Table Editor"** → **"companies"**
2. You should see your test company
3. Check related tables (leadership_contacts, team_members, etc.)

### 3.3 Test Dashboard

1. After onboarding submission, you should be redirected to:
   ```
   /dashboard/[company-id]
   ```
2. Verify health scores display
3. Check that company data loads correctly

### 3.4 Check Vercel Logs

1. In Vercel dashboard → Your project → **"Deployments"**
2. Click latest deployment → **"View Function Logs"**
3. Verify no errors during onboarding submission

---

## Step 4: Production Optimizations

### 4.1 Enable Supabase Realtime (Optional)

For live dashboard updates:

1. Supabase → **"Database"** → **"Replication"**
2. Enable replication for tables you want to subscribe to
3. In your Next.js code, add realtime subscriptions

### 4.2 Set Up Monitoring

**Vercel Analytics**:
1. Project → **"Analytics"** → Enable

**Supabase Logs**:
1. **"Logs"** → **"API"** (monitor API calls)
2. **"Logs"** → **"Database"** (monitor queries)

**Error Tracking** (Optional):
- Integrate Sentry for error tracking
- Add to `next.config.js`:
  ```javascript
  const { withSentryConfig } = require('@sentry/nextjs')
  ```

### 4.3 Configure Rate Limiting

In Supabase:
1. **"Project Settings"** → **"API"**
2. Adjust rate limits based on your plan
3. Consider upgrading if you hit limits

### 4.4 Database Backups

Supabase automatically backs up daily on paid plans.

For Free tier:
1. **"Database"** → **"Backups"**
2. Schedule manual backups weekly
3. Download SQL dumps to local storage

---

## Step 5: Continuous Deployment

### 5.1 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update onboarding flow"
git push origin main

# Vercel automatically builds and deploys
```

### 5.2 Preview Deployments

Every pull request gets a preview URL:

1. Create a branch:
   ```bash
   git checkout -b feature/new-dashboard
   ```
2. Push changes
3. Create PR on GitHub
4. Vercel comments with preview URL
5. Test before merging

### 5.3 Rollback Deployments

If something breaks:

1. Vercel dashboard → **"Deployments"**
2. Find the last working deployment
3. Click **"︙"** → **"Promote to Production"**

---

## Environment-Specific Configuration

### Development
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...
```

### Staging (Vercel Preview)
- Use same Supabase project as production
- Or create separate staging Supabase project

### Production
- All environment variables in Vercel
- Never commit `.env.local` to Git

---

## Troubleshooting Deployment Issues

### Build Fails on Vercel

**Error**: `Type error: ...`
```bash
# Run locally first
npm run build

# Fix TypeScript errors
npm run type-check
```

**Error**: `Module not found`
```bash
# Check package.json dependencies
npm install
```

### Database Connection Fails

1. Check environment variables in Vercel
2. Verify Supabase project is not paused (free tier pauses after inactivity)
3. Test connection with:
   ```typescript
   const { data, error } = await supabase.from('companies').select('count')
   console.log(data, error)
   ```

### 404 on API Routes

- Ensure API route files are in `src/app/api/` directory
- Check file naming: `route.ts` (not `index.ts`)
- Verify exports: `export async function POST() {}`

### Slow Performance

1. Enable Next.js cache in Vercel
2. Add database indexes (already included in migration)
3. Use Vercel Edge Functions for critical paths
4. Optimize images with next/image

---

## Security Checklist

Before going live:

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is only in Production environment
- [ ] Row Level Security (RLS) policies are enabled on all tables
- [ ] Environment variables are not committed to Git
- [ ] `.env.local` is in `.gitignore`
- [ ] CORS is configured in Supabase if needed
- [ ] API routes validate input data
- [ ] Sensitive data is encrypted at rest (Supabase does this automatically)

---

## Scaling Considerations

### When to upgrade plans:

**Supabase Free → Pro** ($25/mo):
- More database storage (8GB → 100GB)
- Daily backups
- No project pausing
- Better support

**Vercel Hobby → Pro** ($20/mo):
- Team collaboration
- Passwordless preview deployments
- Advanced analytics
- More concurrent builds

### Performance Targets

- **Initial Load**: < 2s
- **API Response**: < 500ms
- **Database Query**: < 100ms
- **Onboarding Completion**: < 5 minutes

---

## Support & Maintenance

### Regular Tasks

**Weekly**:
- Check Vercel error logs
- Monitor Supabase usage
- Review failed API calls

**Monthly**:
- Update dependencies: `npm update`
- Check for Next.js updates
- Review and optimize database queries

**Quarterly**:
- Database performance audit
- Security review
- Backup verification

---

## Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js on Vercel](https://vercel.com/solutions/nextjs)

---

**You're live! 🚀**

Your WTF Agency Intelligence System is now running in production, ready to onboard agencies and power your entire consulting ecosystem.
