# Supabase Setup Guide

This guide will help you set up Supabase for the CryptoTrack affiliate trading platform.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (recommended) or email
4. Click "New Project"
5. Choose your organization
6. Enter project details:
   - **Name**: `cryptotrack` (or your preferred name)
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
7. Click "Create new project" (takes ~2 minutes)

## 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## 3. Create Environment Variables

1. In your project root, create a `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

# API Keys (Server-side only)
DEXSCREENER_API_KEY=""
COINGECKO_API_KEY=""

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

2. **Never commit `.env.local` to git!** (already in .gitignore)

## 4. Run the Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New query"
3. Copy the contents of `supabase-schema.sql` and paste it
4. Click "Run" to execute the schema
5. Verify tables were created under **Table Editor**

## 5. Configure Authentication

### Email Authentication (Default)

1. Go to **Authentication** → **Providers**
2. **Email** provider is enabled by default
3. Configure email templates:
   - Go to **Authentication** → **Email Templates**
   - Customize "Confirm signup", "Magic Link", etc.

### OAuth Providers (Optional)

#### Google OAuth
1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Follow Supabase's guide to set up Google OAuth:
   - Create project in [Google Cloud Console](https://console.cloud.google.com)
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://<your-project>.supabase.co/auth/v1/callback`
4. Paste Client ID and Client Secret

#### GitHub OAuth
1. Go to **Authentication** → **Providers**
2. Enable **GitHub**
3. Create OAuth App in GitHub:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Authorization callback URL: `https://<your-project>.supabase.co/auth/v1/callback`
4. Paste Client ID and Client Secret

## 6. Configure Row Level Security (RLS)

The schema already includes RLS policies, but verify they're enabled:

1. Go to **Authentication** → **Policies**
2. Check that policies exist for all tables
3. Test by creating a test user and querying data

## 7. Enable Realtime (Optional)

For live updates on price alerts, notifications, etc.:

1. Go to **Database** → **Replication**
2. Enable replication for these tables:
   - `price_alerts`
   - `notifications`
   - `portfolio`
   - `transactions`

## 8. Test the Setup

Run the development server:

```bash
pnpm dev
```

Try these actions:
1. Visit `/auth/signup` and create an account
2. Check Supabase **Authentication** → **Users** to see your new user
3. Check **Table Editor** → **profiles** to see the auto-created profile
4. Try logging in at `/auth/login`

## 9. Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Service role key is never used client-side
- [ ] RLS policies are enabled on all tables
- [ ] API keys are server-side only (no `NEXT_PUBLIC_` prefix)
- [ ] Email confirmations are enabled in production
- [ ] Rate limiting is configured (see next steps)

## 10. Next Steps

### Add Rate Limiting
Create a Supabase Edge Function for rate limiting:

```bash
supabase functions new rate-limit
```

### Set up Email Service
1. Go to **Settings** → **Auth**
2. Configure SMTP settings for custom email provider
3. Or use Supabase's default email service

### Configure Storage (for avatars/images)
1. Go to **Storage**
2. Create bucket: `avatars`
3. Set up RLS policies for storage

### Set up Database Backups
1. Go to **Settings** → **Database**
2. Enable automatic backups (Pro plan)

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file
- Restart your dev server after changing env vars
- Verify keys match your Supabase project

### RLS prevents data access
- Check RLS policies in **Authentication** → **Policies**
- Verify user is authenticated: `await supabase.auth.getUser()`
- Test queries in SQL Editor with: `SELECT auth.uid()`

### Middleware redirects not working
- Check `/src/middleware.ts` is configured correctly
- Verify Next.js 15 middleware patterns
- Clear cookies and try logging in again

## Useful Links

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
