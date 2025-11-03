#!/bin/bash

BASE_URL="http://localhost:3000/api"

echo "=== Testing OR Scheduler API ==="
echo ""

echo "1. Request brain surgery (without CT preference):"
curl -X POST "$BASE_URL/surgery/request" \
  -H "Content-Type: application/json" \
  -d '{"doctorType": "brain_surgeon"}' | jq .
echo ""
echo ""

echo "2. Request brain surgery (with CT preference for 2h duration):"
curl -X POST "$BASE_URL/surgery/request" \
  -H "Content-Type: application/json" \
  -d '{"doctorType": "brain_surgeon", "prefersCT": true}' | jq .
echo ""
echo ""

echo "3. Request heart surgery:"
curl -X POST "$BASE_URL/surgery/request" \
  -H "Content-Type: application/json" \
  -d '{"doctorType": "heart_surgeon"}' | jq .
echo ""
echo ""

echo "4. Health check:"
curl -s "$BASE_URL/../health" | jq .
echo ""

