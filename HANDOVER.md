# Fawkes Energy Website - Backend Engineer Handover

## Quick Start Checklist

- [ ] Accept GitHub repository transfer
- [ ] Create Sanity account and project
- [ ] Create Netlify account
- [ ] Configure environment variables
- [ ] Deploy to Netlify
- [ ] Set up custom domain (optional)

**Estimated setup time:** 30-45 minutes

**Prerequisites:**
- Node.js 20+ installed
- npm or yarn
- Git installed
- GitHub account
- Sanity account (free tier available)
- Netlify account (free tier available)

---

## 1. Repository Transfer

### Accepting the Transfer

1. You will receive a GitHub notification to accept the repository transfer
2. Click "Accept transfer" in the notification or email
3. The repository will appear in your GitHub account

### Cloning Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/Fawkes-energy.git
cd Fawkes-energy

# Install dependencies
npm install
```

### Folder Structure Overview

```
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog listing and individual posts
│   ├── studio/            # Sanity Studio (embedded)
│   ├── layout.tsx         # Root layout with fonts, metadata
│   └── page.tsx           # Homepage
├── components/
│   ├── blog/              # Blog-specific components
│   │   ├── layouts/       # Post layouts (Immersive, Magazine, Minimal)
│   │   └── shared/        # Shared blog components
│   ├── sections/          # Homepage sections
│   └── ui/                # Reusable UI components
├── public/
│   ├── images/            # Static images
│   └── videos/            # Compressed video files
├── sanity/                # Sanity CMS configuration
│   ├── schemas/           # Content schemas (post, author, etc.)
│   └── lib/               # Sanity client utilities
├── videos/                # Source videos (for compression)
├── netlify.toml           # Netlify build configuration
└── next.config.js         # Next.js configuration
```

---

## 2. Sanity CMS Setup

Sanity is the headless CMS powering the blog. You need to create your own Sanity project.

### Step 2.1: Create Sanity Account

1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up for a free account
3. Create a new project:
   - Project name: `fawkes-energy` (or your preference)
   - Dataset: `production`
   - Choose "Clean project with no predefined schemas"

### Step 2.2: Get Project Credentials

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **Settings** → **API**
4. Note down:
   - **Project ID** (e.g., `abc123xyz`)
   - **Dataset** (usually `production`)

### Step 2.3: Create Environment File

Create `.env.local` in the project root:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-25
```

### Step 2.4: Update Sanity Config

Update `sanity.cli.ts` with your project ID:

```typescript
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'your_project_id_here',  // ← Update this
    dataset: 'production'
  }
})
```

### Step 2.5: Deploy Sanity Schema

```bash
# Login to Sanity CLI
npx sanity login

# Deploy the schema to your Sanity project
npx sanity deploy
```

### Step 2.6: Access Sanity Studio

The Sanity Studio is embedded in the website at `/studio`. After deployment, you can access it at:
- Local: `http://localhost:3000/studio`
- Production: `https://your-domain.com/studio`

### Step 2.7: Create Initial Content

In Sanity Studio:
1. Create an **Author** (your name, photo, bio)
2. Create **Blog Posts** with:
   - Title
   - Slug (auto-generated from title)
   - Author (select from dropdown)
   - Main Image
   - Post Style (Immersive/Magazine/Minimal)
   - Excerpt
   - Body content

---

## 3. Netlify Deployment Setup

### Step 3.1: Create Netlify Account

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up (free tier is sufficient)

### Step 3.2: Import from GitHub

1. Click **"Add new site"** → **"Import an existing project"**
2. Select **GitHub** and authorize Netlify
3. Choose the `Fawkes-energy` repository
4. Netlify will auto-detect settings from `netlify.toml`

### Step 3.3: Configure Environment Variables

In Netlify dashboard → **Site settings** → **Environment variables**, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-02-25` |
| `NETLIFY_NEXT_PLUGIN_SKIP` | `true` |
| `NODE_VERSION` | `20` |

### Step 3.4: Build Settings (Pre-configured)

The `netlify.toml` already contains:

```toml
[build]
  command = "npm run build:no-compress"
  publish = "out"

[build.environment]
  NODE_VERSION = "20"
  NETLIFY_NEXT_PLUGIN_SKIP = "true"
```

**Important:** The site uses static export (`output: 'export'` in `next.config.js`). The `NETLIFY_NEXT_PLUGIN_SKIP` environment variable is critical - it prevents Netlify from using its Next.js runtime, which is incompatible with static exports.

### Step 3.5: Trigger First Deploy

1. Click **"Deploy site"** in Netlify
2. Wait for build to complete (~1-2 minutes)
3. Your site will be live at `https://random-name.netlify.app`

---

## 4. Custom Domain Setup

### Step 4.1: Add Domain in Netlify

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `fawkes.energy`)

### Step 4.2: Configure DNS

Add these DNS records at your domain registrar:

**Option A: Netlify DNS (Recommended)**
- Point nameservers to Netlify's DNS servers

**Option B: External DNS**
```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     your-site.netlify.app
```

### Step 4.3: SSL Certificate

Netlify automatically provisions a free SSL certificate via Let's Encrypt. This happens automatically after DNS propagation (can take up to 48 hours).

### Step 4.4: Force HTTPS (Optional)

In **Site settings** → **Domain management** → **HTTPS**:
- Enable "Force HTTPS"

---

## 5. Ongoing Maintenance

### Adding/Editing Blog Posts

1. Go to `https://your-domain.com/studio`
2. Login with your Sanity credentials
3. Create or edit posts
4. **Important:** After publishing, you need to trigger a rebuild:
   - Push any commit to GitHub, OR
   - Manually trigger deploy in Netlify dashboard

### Updating Site Content

For homepage content (sections, copy, etc.):
1. Edit files in `components/sections/`
2. Commit and push to GitHub
3. Netlify auto-deploys on push

### Video Compression Workflow

Source videos go in `/videos/` folder. The compression script:

```bash
npm run compress-videos
```

This generates optimized versions in `public/videos/`:
- Desktop: `.mp4` and `.webm` (1920x1080, 30fps)
- Mobile: `-mobile.mp4` and `-mobile.webm` (720x480, 24fps)
- Poster images: `-poster.jpg`

**Note:** FFmpeg must be installed locally for compression. On Netlify, use the pre-compressed files.

### Triggering Manual Rebuilds

To rebuild without code changes (e.g., after Sanity content updates):

**Option 1: Netlify Dashboard**
- Go to **Deploys** → **Trigger deploy** → **Deploy site**

**Option 2: Build Hook (Advanced)**
1. Create a build hook in Netlify dashboard
2. Configure Sanity webhook to call it on publish

---

## 6. Architecture Reference

### Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Sanity | Headless CMS for blog |
| Netlify | Hosting and CI/CD |
| Chart.js | Data visualizations |

### Key Configuration Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js config (static export enabled) |
| `netlify.toml` | Netlify build settings |
| `tailwind.config.js` | Tailwind theme customization |
| `sanity.config.ts` | Sanity Studio configuration |
| `sanity/schemas/*.ts` | Content type definitions |

### Blog Post Layouts

Three layouts available (selected per-post in Sanity):

1. **Immersive** (default): Full-screen parallax hero, dramatic typography
2. **Magazine**: Full-bleed hero, drop caps, elegant cards
3. **Minimal**: Clean typography-focused, fast-loading

### Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | API version (defaults to 2024-02-25) |
| `NETLIFY_NEXT_PLUGIN_SKIP` | Yes | Must be `true` for static export |
| `NODE_VERSION` | Yes | Must be `20` |

---

## 7. Troubleshooting

### Build Fails with "404" After Deploy

**Cause:** Netlify's Next.js runtime is intercepting requests.

**Solution:** Ensure `NETLIFY_NEXT_PLUGIN_SKIP=true` is set in environment variables.

### Sanity Studio Shows "Missing Project ID"

**Cause:** Environment variables not set.

**Solution:** 
1. Check `.env.local` exists locally
2. Check Netlify environment variables are set
3. Rebuild after adding variables

### Blog Posts Not Showing

**Cause:** Sanity content not fetched during build.

**Solution:**
1. Verify Sanity project ID is correct
2. Check dataset name matches
3. Ensure posts are published (not drafts)
4. Trigger a new deploy

### Videos Not Playing

**Cause:** Missing video files or wrong paths.

**Solution:**
1. Ensure videos exist in `public/videos/`
2. Check file names match component references
3. Verify both `.mp4` and `.webm` versions exist

### Build Takes Too Long

**Cause:** Video compression running during build.

**Solution:** Use `npm run build:no-compress` (already configured in `netlify.toml`). Compress videos locally before committing.

---

## 8. Support & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Sanity Docs:** https://www.sanity.io/docs
- **Netlify Docs:** https://docs.netlify.com
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## Handover Checklist

Before considering the handover complete:

- [ ] Repository successfully transferred
- [ ] Local development environment working (`npm run dev`)
- [ ] Sanity project created with correct schema
- [ ] Sanity Studio accessible at `/studio`
- [ ] At least one blog post created and visible
- [ ] Netlify deployment successful
- [ ] Environment variables configured
- [ ] Custom domain connected (if applicable)
- [ ] SSL certificate active
- [ ] Test full content editing → deploy cycle

---

*Document created: December 2024*
*Last updated: December 4, 2024*

