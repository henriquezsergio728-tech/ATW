# API catalog

The application depends on five external HTTP APIs. Each service module converts the provider-specific response into a smaller internal representation.

| Domain | Provider | Purpose | Authentication | Main concept |
|---|---|---|---|---|
| Time | TimeAPI.io | Current time in `America/El_Salvador` | None | Time zones and ISO 8601 |
| Currency | Frankfurter | Selected exchange rates with USD as base | None | Query parameters and normalization |
| Weather | Open-Meteo | Current San Salvador weather | None | Coordinates and units |
| Network | ipify | Server public egress IP | None | NAT, egress, IPv4/IPv6 |
| Calendar | Nager.Date | Upcoming El Salvador public holidays | None | Country codes and date filtering |

## Provider boundaries

No route should expose the complete upstream payload. Each service returns only the fields the ATW application owns. This reduces coupling to third-party response formats.

## Failure policy

- Every outbound request has a timeout.
- Individual endpoints return HTTP 502 when their provider fails.
- `/api/v1/overview` returns all successful results even when one or more providers fail.
- Each result includes its request duration to make latency visible during development.
