import http from 'k6/http';
import { check, sleep } from "k6";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { BASE_URL, TODO_PATH } from '../Utils/const.js';

// Smoke Test -> load Test
export let options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "5m", target: 10 },
    { duration: "10s", target: 0 },
    // { duration: "1m", target: 100 },
  ]
};

export default function () {
  const body = {
    "title": randomString(8),
    "description": randomString(18),
    "completed": false
  }

  const response = http.post(
    BASE_URL + TODO_PATH,
    JSON.stringify(body),
    { headers: { Accepts: "application/json" } }
  );

  check(response, { "Status Code Create is 201": (r) => r.status === 201 });
  sleep(.300);
};
