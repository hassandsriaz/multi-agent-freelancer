# Upwork Multi-Agent System: Usage Guide

This guide provides detailed instructions on how to use the Upwork Multi-Agent System for your freelancing activities.

## Setting Up

1. **Environment Variables**: Copy `env.example` to `.env` and fill in your credentials:
   ```
   cp env.example .env
   ```
   
   Edit the `.env` file with your actual credentials:
   - Upwork API credentials
   - OpenAI API key (required for LLM functionality)
   - Database connection string (if using a separate database)

2. **Starting the System**: Use Docker Compose to start all services:
   ```
   docker compose up -d
   ```

## Core Functionality

### Profile Management

1. **View Your Profile**:
   ```
   GET /api/profile
   ```

2. **Update Your Profile**:
   ```
   POST /api/profile/update
   
   {
     "name": "Your Name",
     "skills": ["Python", "JavaScript", "React"],
     "hourly_rate": 50
   }
   ```

3. **Optimize Your Profile**:
   ```
   POST /api/profile/optimize
   ```
   This will generate suggestions to improve your profile.

### Job Management

1. **Search for Jobs**:
   ```
   POST /api/jobs/search
   
   {
     "keywords": "python developer",
     "skills": ["python", "django", "api"],
     "limit": 10
   }
   ```

2. **Get Job Details**:
   ```
   GET /api/jobs/{job_id}
   ```

3. **Generate a Proposal**:
   ```
   POST /api/jobs/{job_id}/generate-proposal
   
   {
     "job_id": "your-job-id",
     "custom_notes": "Include my experience with XYZ technology."
   }
   ```

4. **Submit a Proposal**:
   ```
   POST /api/jobs/{job_id}/submit-proposal
   
   {
     "job_id": "your-job-id",
     "cover_letter": "Your cover letter text",
     "rate": 50,
     "hours_per_week": 40
   }
   ```

### Multi-Agent Automation

1. **Automate Job Application Process**:
   ```
   POST /api/crew/automate-job-application
   
   {
     "job_search_criteria": {
       "keywords": "python developer",
       "skills": ["python", "django"]
     },
     "custom_profile_data": {
       "hourly_rate": 60
     }
   }
   ```
   This will:
   - Search for relevant jobs
   - Generate personalized proposals
   - Prepare interview responses
   - Suggest profile optimizations

## Authentication

1. **Get Access Token**:
   ```
   POST /api/auth/token
   
   {
     "username": "your-username",
     "password": "your-password"
   }
   ```

2. **Use Access Token**:
   Include the token in the Authorization header for protected endpoints:
   ```
   Authorization: Bearer <your-token>
   ```

## Monitoring

1. **Health Check**:
   ```
   GET /health
   ```

2. **Prometheus Metrics**:
   ```
   GET /metrics
   ```

3. **Grafana Dashboard**:
   Access Grafana at `http://localhost:3000` with default credentials (admin/admin).

## Common Issues

- **Authentication Errors**: Ensure your Upwork API credentials are correct.
- **Rate Limiting**: The Upwork API has rate limits. The system implements exponential backoff.
- **Database Errors**: Ensure PostgreSQL is running and the connection string is correct.

## Best Practices

1. Always test with smaller job searches before automating large-scale applications.
2. Regularly optimize your profile based on the system's suggestions.
3. Review generated proposals before submitting them.
4. Monitor the logs for any errors or warnings. 