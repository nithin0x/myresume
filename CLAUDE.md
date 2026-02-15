# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal resume website - a static HTML/CSS/JS portfolio for a cybersecurity professional. The site displays professional information including summary, skills, work experience, education, and certifications.

## File Structure

- `index.html` - Main HTML content with resume data
- `style.css` - Styling with CSS variables, responsive design, and print support
- `main.js` - Theme toggle and PDF download functionality
- `README.md` - Basic project readme (currently minimal)

## Development

This is a static site with no build process. To view changes:
- Open `index.html` directly in a browser, or
- Serve locally: `python -m http.server 8000` then visit `http://localhost:8000`

## Features

- **Theme Toggle**: Light/dark mode persisted to localStorage, respects system preference on first visit
- **PDF Download**: Uses browser print functionality (`window.print()`)
- **Responsive**: Mobile-friendly with media queries for screens under 640px
- **Print Styles**: Optimized CSS for printing (hides toolbar, resets colors)

## Customization

To update resume content, edit the relevant sections in `index.html`:
- Header (name, title, contact info) - lines 20-35
- Professional Summary - lines 38-49
- Skills (chip format) - lines 52-65
- Experience - lines 67-89
- Education - lines 91-114
- Certifications - lines 116-153

To modify styling, edit `style.css` - theme colors are defined as CSS variables in lines 3-9 (light) and 12-18 (dark).

To modify behavior, edit `main.js` - contains theme management and PDF download logic.
