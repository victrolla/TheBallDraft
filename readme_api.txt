Backend Developer Brief — The Ball (Expanded)

Project Overview

The Ball is a SaaS fleet management platform targeting industrial fleets in New Zealand.
The system provides:
- Real-time vehicle, driver, and freight tracking
- Booking & calendar management
- Stop-off & return logistics
- Predictive maintenance & alerts
- Analytics & reporting dashboards
- Compliance tools for NZ Transport Agency
- Client portals for customers

Key Integrations: Google Maps API, real-time WebSockets (Supabase Realtime), Twilio/SendGrid notifications, cloud storage, Text-to-Speech/Speech-to-Text.

Project Stack

Layer	Tech
Frontend	React + TypeScript + Tailwind CSS
Backend	Supabase Edge Functions / Node.js + Express
Database	PostgreSQL (Supabase / Cloud SQL)
Cloud	Google Cloud Platform (Cloud Functions, Cloud Run, Firestore, Storage)
Hosting	Netlify (Frontend), Supabase (Backend)
CI/CD	GitHub Actions / Netlify / Supabase deploy pipelines
Notifications	SendGrid, Twilio
Mapping & Geolocation	Google Maps API (Directions, Geocoding, Maps Embed)
Voice / Text	Google Text-to-Speech, Speech-to-Text

1. Authentication & User Management

- Implement signup, login, password reset via Supabase Auth or Auth0
- User roles: admin, dispatcher, driver, client
- Session management using JWT tokens
- Protect routes with middleware:
  - ProtectedRoute.tsx → requires authentication
  - RequireRole.tsx → role-based access
- Frontend form validation: Zod/Yup
- Audit all authentication actions (sign-ins, sign-ups, resets)

Advanced considerations:
- Multi-factor authentication (optional for admin roles)
- Account lockouts after failed login attempts
- Integration with Stripe to verify subscription access before allowing login

2. Database Structure (PostgreSQL / Supabase)

Core Tables:
- users – roles, credentials, preferences
- vehicles – current location, type, status, fuel
- drivers – assigned vehicle, license, status
- trips – vehicle, driver, origin, destination, times, status
- bookings – customer info, service type, assigned vehicle/driver, schedule, status
- alerts – type, severity, related trip, acknowledgement

Row-Level Security (RLS):
- Drivers see only assigned vehicles/trips
- Admins see all
- Customers see only their bookings

Sample SQL Commands:
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can view assigned vehicles"
ON vehicles
FOR SELECT
USING (assigned_driver = auth.uid());

Additional SQL Notes:
- Ensure GEOGRAPHY(POINT, 4326) for all location fields
- Index frequent search columns (vehicle type, driver ID, booking date) for performance
- Set default timestamps for creation & updates (created_at, updated_at)

3. API & Backend Logic

Supabase Edge Functions / Node.js Endpoints:
- /api/login – authenticate users
- /api/signup – create users
- /api/vehicles – CRUD vehicles
- /api/drivers – CRUD drivers
- /api/trips – CRUD trips
- /api/bookings – CRUD bookings
- /api/alerts – create, acknowledge, filter alerts

Backend Responsibilities:
- Fetch vehicle, driver, and trip data
- Dispatch algorithm: assign bookings intelligently
- Alerts & notifications via SendGrid/Twilio
- PDF/CSV generation for reports & invoices
- Bulk CSV import parser

Validation & Error Handling:
- Use Zod/Yup schemas for all inputs
- Return structured errors for 4xx/5xx requests
- Log errors with Sentry or custom logger (utils/logger.ts)

Real-time Features:
- Vehicle and trip updates via Supabase Realtime WebSockets
- Alerts feed updates dynamically on dashboards

4. Cloud & API Integrations

Google Cloud Setup:
- Cloud SQL → production PostgreSQL
- Cloud Functions / Cloud Run → backend logic
- Firestore → cache analytics & telemetry
- Cloud Storage → media, documents, CSV uploads
- Google Maps API → routing, geocoding, live directions
- Text-to-Speech / Speech-to-Text → voice-enabled features

Required API Keys:
- Google Maps API (Directions, Geocoding, Maps Embed)
- Google Text-to-Speech & Speech-to-Text
- Supabase API key
- SendGrid / Twilio
- Netlify deploy / webhook keys

gcloud Commands:
gcloud auth login
gcloud config set project <PROJECT_ID>
gcloud services enable cloudfunctions.googleapis.com
gcloud sql instances create <INSTANCE_NAME> --database-version=POSTGRES_15
gcloud storage buckets create gs://<BUCKET_NAME> --location=<REGION>
gcloud run deploy <SERVICE_NAME> --source . --region <REGION> --allow-unauthenticated

5. CLI & Deployment Commands

Supabase CLI:
npm install -g supabase
supabase init
supabase start
supabase stop
supabase functions deploy <function_name>
supabase login
supabase gen types typescript --local > types.ts

Netlify CLI:
npm install -g netlify-cli
netlify login
netlify init
netlify deploy
netlify deploy --prod
netlify open

Node / React / Tailwind:
npm install
npm run dev
npm run build
npm start
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

6. Features to Implement (Phase 1)

Foundation:
- Auth & roles
- CRUD for vehicles, drivers, trips, bookings
- Real-time WebSocket updates
- Dashboard endpoints for KPIs
- Calendar & booking system
- Alerts & notifications

Phase 2 & Beyond:
- Dispatch algorithm
- Predictive maintenance engine
- NZ compliance engine (RUC, logbooks)
- Reporting & analytics dashboards
- Multi-tenancy for clients
- Subscription-based feature access

7. Security & Compliance

- Store API keys in Supabase Env Variables or GCP Secret Manager
- Enforce HTTPS
- Role-based access control (RBAC)
- Audit logging for all DB write actions
- Data encryption at rest (Cloud SQL & Storage)
- Optional MFA for admins
- GDPR & NZ privacy compliance

8. Deployment Notes

- Frontend: Netlify with CI/CD
- Backend: Supabase Edge Functions / Cloud Run
- Database: Supabase / Cloud SQL (PostgreSQL)
- Backups & monitoring: automated point-in-time recovery
- Offline-first functionality for mobile operators

9. Onboarding & Subscription

- Self-service client registration
- Subscription tiers: Basic / Pro / Enterprise
- Access control based on subscription
- Stripe integration to track payments & active subscriptions

10. Deliverables

- Fully functional API endpoints
- Realtime map & telemetry updates
- Database schema with RLS & indexes
- Auth & role management
- Notification engine
- PDF/CSV report endpoints
- Integration with Google Maps, TTS, and STT
- CI/CD deployment scripts
- Backend & API documentation