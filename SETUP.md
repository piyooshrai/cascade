# Cascade Setup Guide

This guide will walk you through setting up Cascade from scratch.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier works)
- An Anthropic API key

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/cascade.git
cd cascade

# Install dependencies
npm install
```

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Choose an organization
5. Enter project details:
   - Name: `cascade`
   - Database Password: (save this securely)
   - Region: Choose closest to you
6. Click "Create new project"
7. Wait for the project to be provisioned

### 2.2 Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy the following values:
   - **Project URL**: Your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key**: Your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Go to Settings → API → Service role key (reveal it)
4. Copy the **service_role key**: Your `SUPABASE_SERVICE_ROLE_KEY`

### 2.3 Run the Database Schema

1. In Supabase dashboard, go to the SQL Editor
2. Create a new query
3. Copy the contents of `supabase-schema.sql` from this repository
4. Paste it into the SQL Editor
5. Click "Run" to execute the schema
6. You should see a success message

The schema creates:
- `users` table
- `presentations` table
- Indexes for performance
- Row Level Security policies
- Triggers for automatic timestamp updates

## Step 3: Get Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in or create an account
3. Go to API Keys section
4. Click "Create Key"
5. Name it "Cascade" or similar
6. Copy the API key (starts with `sk-ant-`)
7. Save it securely - you won't be able to see it again

## Step 4: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Anthropic API
ANTHROPIC_API_KEY=sk-ant-your_key_here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Never commit the `.env` file to git. It's already in `.gitignore`.

## Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the Cascade landing page.

## Step 6: Test the Application

### Create Your First Presentation

1. Click "Create Presentation" or navigate to `/dashboard/new`
2. Fill in the form:
   - **Source URL**: Use any article URL (e.g., a blog post, news article)
   - **Title**: "My First Presentation"
   - **Client Name**: (optional) "Test Client"
   - **Theme**: Choose any theme
3. Click "Generate Presentation"
4. Wait for the AI to generate slides (15-30 seconds)
5. View your presentation with keyboard navigation

### Test Public Sharing

1. In the presentation view, click "Copy Share Link"
2. Open the link in an incognito/private browser window
3. You should see the presentation without authentication

## Common Issues & Solutions

### Issue: "Failed to fetch presentations"

**Solution**: Check your Supabase credentials in `.env`. Make sure the project URL and keys are correct.

### Issue: "Failed to generate slides"

**Solution**:
- Check your Anthropic API key
- Make sure you have credits in your Anthropic account
- Check the browser console for detailed error messages

### Issue: Build errors with TypeScript

**Solution**:
```bash
npm run type-check
```
This will show TypeScript errors without building.

### Issue: Supabase RLS blocking requests

**Solution**: The schema includes RLS policies. For testing without authentication, the policies allow public read access via share tokens. For dashboard features, you may need to temporarily disable RLS during development:

```sql
ALTER TABLE presentations DISABLE ROW LEVEL SECURITY;
```

(Re-enable it before production deployment)

## Step 7: Deploy to Vercel (Optional)

### 7.1 Push to GitHub

```bash
git add .
git commit -m "Initial Cascade setup"
git push origin main
```

### 7.2 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `cascade` repository
5. Configure the project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-configured)
6. Add Environment Variables:
   - Click "Environment Variables"
   - Add each variable from your `.env` file
   - **Important**: Change `NEXT_PUBLIC_APP_URL` to your Vercel URL
7. Click "Deploy"
8. Wait for deployment to complete
9. Visit your live site

### 7.3 Update Environment Variables After First Deploy

1. Go to your Vercel project settings
2. Update `NEXT_PUBLIC_APP_URL` to your actual Vercel domain:
   ```
   https://your-project.vercel.app
   ```
3. Redeploy the project

## Next Steps

Now that Cascade is set up, you can:

1. **Customize Themes**: Edit `styles/themes.css` to modify animations and colors
2. **Add Authentication**: Implement Supabase Auth for user management
3. **Extend AI Features**: Add image generation or enhance slide content
4. **Create Templates**: Add pre-built presentation templates
5. **Add Analytics**: Track presentation views and engagement

## Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## Project Structure

```
cascade/
├── app/              # Next.js app router pages and API routes
├── components/       # React components
├── lib/              # Utility functions and integrations
├── styles/           # CSS and theme files
├── public/           # Static assets
└── supabase-schema.sql  # Database schema
```

## Support

If you encounter issues:

1. Check this setup guide
2. Review the main README.md
3. Check the browser console for errors
4. Verify all environment variables are set correctly
5. Make sure Supabase schema was applied successfully

## Security Checklist

Before deploying to production:

- [ ] All environment variables are set in Vercel
- [ ] `.env` file is not committed to git
- [ ] Supabase RLS policies are enabled and tested
- [ ] Anthropic API key has appropriate rate limits
- [ ] CORS and security headers are configured
- [ ] Test all features in production environment

---

You're all set! Enjoy building beautiful presentations with Cascade.
