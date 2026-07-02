"""
Seed script: Creates a demo employer user + 120 realistic job listings.
Run with: python seed_jobs.py
(Run from the backend/ directory with venv activated)
"""

import os
import sys
import django
import random
from decimal import Decimal
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "jobboard.settings")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from django.contrib.auth import get_user_model
from jobs.models import Job

User = get_user_model()

# ── Create or get a demo employer ────────────────────────────────────────────
employer, created = User.objects.get_or_create(
    username="demo_employer",
    defaults={
        "email": "employer@jobboard.com",
        "role": "employer",
        "location": "Mumbai",
    },
)
if created:
    employer.set_password("Demo@1234")
    employer.save()
    print("✅ Created demo employer: demo_employer / Demo@1234")
if not created:
    print("ℹ️  Using existing employer: demo_employer")

if Job.objects.count() > 0:
    print("ℹ️  Database already has jobs. Skipping seeding to prevent duplication.")
    sys.exit(0)


# ── Job data pools ────────────────────────────────────────────────────────────
COMPANIES = [
    "Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro", "Accenture",
    "Flipkart", "Zomato", "Swiggy", "Ola", "Paytm", "Razorpay", "CRED",
    "PhonePe", "Meesho", "Dream11", "Byju's", "Unacademy", "Freshworks",
    "Zoho", "HCL Technologies", "Tech Mahindra", "Cognizant", "Capgemini",
    "IBM India", "Oracle India", "SAP India", "Adobe India", "Salesforce India",
    "Myntra", "Nykaa", "PolicyBazaar", "Lenskart", "Urban Company",
    "Groww", "Zerodha", "Upstox", "AngelOne", "IndiaMart",
]

LOCATIONS = [
    "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune",
    "Kolkata", "Ahmedabad", "Noida", "Gurgaon", "Jaipur", "Chandigarh",
    "Kochi", "Indore", "Bhopal", "Remote", "Hybrid - Bangalore",
    "Hybrid - Mumbai", "Hybrid - Hyderabad", "Hybrid - Delhi",
]

JOB_TYPES = ["Full-Time", "Part-Time", "Internship"]

TITLES_FULLTIME = [
    "Senior Software Engineer", "Full Stack Developer", "Backend Engineer",
    "Frontend Developer", "DevOps Engineer", "Cloud Architect",
    "Data Scientist", "Machine Learning Engineer", "AI Engineer",
    "Product Manager", "Engineering Manager", "Tech Lead",
    "Android Developer", "iOS Developer", "React Native Developer",
    "UI/UX Designer", "Graphic Designer", "Product Designer",
    "QA Engineer", "SDET", "Security Engineer",
    "Database Administrator", "Site Reliability Engineer", "Platform Engineer",
    "Blockchain Developer", "AR/VR Developer", "Game Developer",
    "Business Analyst", "System Analyst", "Solution Architect",
    "Scrum Master", "Agile Coach", "CTO (Startup)",
    "Python Developer", "Java Developer", "Node.js Developer",
    "Go Developer", "Rust Developer", "Kotlin Developer",
    "Data Analyst", "Business Intelligence Analyst", "Data Engineer",
]

TITLES_PARTTIME = [
    "Part-Time React Developer", "Part-Time Content Writer",
    "Part-Time Social Media Manager", "Part-Time Data Entry Operator",
    "Part-Time Graphic Designer", "Part-Time SEO Analyst",
    "Part-Time Customer Support Agent", "Part-Time Video Editor",
    "Part-Time Accountant", "Part-Time HR Coordinator",
    "Weekend Tech Support", "Part-Time Marketing Executive",
]

TITLES_INTERNSHIP = [
    "Software Engineering Intern", "Frontend Intern", "Backend Intern",
    "Data Science Intern", "ML Intern", "UI/UX Design Intern",
    "Product Management Intern", "Business Development Intern",
    "Marketing Intern", "Content Writing Intern",
    "DevOps Intern", "Cybersecurity Intern",
    "React Developer Intern", "Python Intern",
    "Android Development Intern", "iOS Intern",
]

DESCRIPTIONS = [
    "We are looking for a passionate {title} to join our growing team. You will work on cutting-edge projects, collaborate with world-class engineers, and ship products used by millions of users worldwide.",
    "Join {company} as a {title} and be part of a fast-paced, innovation-driven team. You will design, develop, and maintain high-quality software solutions that solve real-world problems.",
    "Exciting opportunity for a {title} at {company}. You'll work in an Agile environment, contribute to architecture decisions, and mentor junior team members.",
    "We're seeking a talented {title} who is self-driven and loves solving complex problems. At {company}, we value creativity, ownership, and continuous learning.",
    "As a {title} at {company}, you'll be responsible for delivering scalable and reliable software. You'll collaborate closely with cross-functional teams including product, design, and QA.",
    "This is a great opportunity for a {title} who wants to grow their career at one of India's top technology companies. You'll have access to the best tools and a supportive team.",
    "{company} is hiring a {title} to help build and scale our platform. If you love working on hard technical challenges and want to make an impact, this role is for you.",
    "We are building the future of fintech and need a {title} to join our core engineering team at {company}. Great compensation, remote-friendly culture, and amazing team await you.",
]

SALARY_RANGES = {
    "Full-Time": (40000, 250000),
    "Part-Time": (15000, 60000),
    "Internship": (5000, 25000),
}

# ── Clear existing seeded jobs (optional, comment out if you want to keep) ───
existing = Job.objects.filter(created_by=employer).count()
if existing > 0:
    Job.objects.filter(created_by=employer).delete()
    print(f"🗑️  Deleted {existing} old seeded jobs")

# ── Generate 120 jobs ─────────────────────────────────────────────────────────
jobs_to_create = []

def pick_salary(job_type):
    lo, hi = SALARY_RANGES[job_type]
    raw = random.randint(lo // 1000, hi // 1000) * 1000
    return Decimal(raw)

def pick_description(title, company):
    tmpl = random.choice(DESCRIPTIONS)
    return tmpl.format(title=title, company=company)

# 70 Full-Time
for _ in range(70):
    company = random.choice(COMPANIES)
    title   = random.choice(TITLES_FULLTIME)
    jobs_to_create.append(Job(
        title=title,
        company=company,
        location=random.choice(LOCATIONS),
        salary=pick_salary("Full-Time"),
        description=pick_description(title, company),
        job_type="Full-Time",
        created_by=employer,
    ))

# 25 Part-Time
for _ in range(25):
    company = random.choice(COMPANIES)
    title   = random.choice(TITLES_PARTTIME)
    jobs_to_create.append(Job(
        title=title,
        company=company,
        location=random.choice(LOCATIONS),
        salary=pick_salary("Part-Time"),
        description=pick_description(title, company),
        job_type="Part-Time",
        created_by=employer,
    ))

# 25 Internships
for _ in range(25):
    company = random.choice(COMPANIES)
    title   = random.choice(TITLES_INTERNSHIP)
    jobs_to_create.append(Job(
        title=title,
        company=company,
        location=random.choice(LOCATIONS),
        salary=pick_salary("Internship"),
        description=pick_description(title, company),
        job_type="Internship",
        created_by=employer,
    ))

random.shuffle(jobs_to_create)
Job.objects.bulk_create(jobs_to_create)
print(f"✅ Created {len(jobs_to_create)} jobs successfully!")
print("\n📋 Summary:")
print(f"   Full-Time   : 70")
print(f"   Part-Time   : 25")
print(f"   Internship  : 25")
print(f"   Total       : 120")
print(f"\n🌐 Open http://localhost:5173/jobs to see them!")
