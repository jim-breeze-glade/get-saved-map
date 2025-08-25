# Security Information

## Known Vulnerabilities

This project currently has some dependency vulnerabilities that are inherited from development tools and are not present in the production build:

### High/Critical Issues:
- **react-scripts**: Contains vulnerabilities in build tools (webpack-dev-server, svgo, nth-check). These only affect development, not production.
- **nominatim-geocoder**: Uses an outdated version of axios with security issues. Consider replacing with a more secure geocoding solution.

### Mitigation Strategies:
1. **Development vulnerabilities**: Only affect build process, not deployed application
2. **Runtime dependencies**: Keep axios updated through dependency management
3. **Content Security Policy**: Implemented via .htaccess for additional protection
4. **Security headers**: Added X-Frame-Options, X-Content-Type-Options, etc.

## Security Scanning

The CI/CD pipeline includes:
- `npm audit` checks on every build
- License compatibility verification
- Dependency vulnerability scanning
- Security headers in production

## Reporting Security Issues

If you discover a security issue, please report it via GitHub's security advisory feature.

## Security Best Practices Implemented

1. **Build Security**: Source maps disabled in production
2. **HTTP Security**: Security headers via .htaccess
3. **Content Security**: CSP headers configured
4. **Dependency Management**: Regular security audits in CI/CD
5. **Access Control**: Proper CORS and referrer policies