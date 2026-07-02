# ─────────────────────────────────────────────────────────────────
# Backend Dockerfile  –  Django + Gunicorn
# ─────────────────────────────────────────────────────────────────

# Use official Python slim image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies needed by psycopg2
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy project source
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput || true

# Expose port
EXPOSE 8000

# Entrypoint: wait for DB, run migrations, start Gunicorn
CMD ["sh", "-c", "python manage.py migrate && python seed_jobs.py && gunicorn jobboard.wsgi:application --bind 0.0.0.0:8000 --workers 2"]
