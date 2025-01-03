#!/bin/bash
set -euo pipefail

TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
log_info() {
  echo "$TIMESTAMP - INFO: $1"
}

log_error() {
  echo "$TIMESTAMP - ERROR: $1" >&2
}

cleanup() {
  if [ -f "frontend.pid" ]; then
    kill $(cat "frontend.pid")
    rm "frontend.pid"
    log_info "Frontend process killed and PID file removed."
  fi
  if [ -f "backend.pid" ]; then
    kill $(cat "backend.pid")
    rm "backend.pid"
    log_info "Backend process killed and PID file removed."
  fi
}

trap cleanup EXIT ERR INT TERM

if [ -f ".env" ]; then
  source .env
  log_info ".env file loaded."
else
  log_error ".env file not found."
  exit 1
fi

if [ -z "${VITE_PORT}" ] || ! [[ "${VITE_PORT}" =~ ^[0-9]+$ ]]; then
    log_error "VITE_PORT is not set or is invalid in .env."
    exit 1
fi

if [ -z "${VITE_API_BASE_URL}" ]; then
    log_error "VITE_API_BASE_URL is not set in .env."
    exit 1
fi

if [ -z "${VITE_JWT_SECRET}" ]; then
  log_error "VITE_JWT_SECRET is not set in .env."
  exit 1
fi

if [ -z "${VITE_DB_URL}" ]; then
  log_error "VITE_DB_URL is not set in .env."
  exit 1
fi

log_info "Starting backend service."
cd api
npm install
node server.js &
backend_pid=$!
echo "$backend_pid" > "backend.pid"
log_info "Backend started with PID: $backend_pid"
cd ..

log_info "Starting frontend service."
npm run dev &
frontend_pid=$!
echo "$frontend_pid" > "frontend.pid"
log_info "Frontend started with PID: $frontend_pid"


wait "$backend_pid" "$frontend_pid"
backend_status=$?
frontend_status=$?

if [ "$backend_status" -ne 0 ] || [ "$frontend_status" -ne 0 ]; then
  log_error "One or more services failed to start."
  exit 1
else
    log_info "All services started successfully."
    exit 0
fi