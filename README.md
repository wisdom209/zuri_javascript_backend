# zuri_javascript_backend
Backend Group Tasks

THE FIRST THING YOU WANT TO DO IS MAKE A COPY OF THIS DOCUMENT FOR YOUR TEAM. 

Team Project for Backend Participants: Generic Database Search Project

## Project Overview:
In this project, you'll be working on developing generic database search functionality with a focus on main objects and their related objects. The main objective is to allow users to search for a main object based on any keyword related to it, and the results should include both the main object and all its related objects.

For example, searching for a postcode like "BL7" should return the B7 TRY address and all related entities like county, city, country, and continent. API Endpoints: GET /api/search?query={searchTerm}:
This endpoint should return results based on the provided search term. The results should include the main object matching the search term and all related objects.

## Search Criteria:
Users should be able to search for a main object based on any keyword related to it.
The search results should be organized in order of the proximity of the matches.

## Task Requirements:
- Database Design: Implement the database schema for the main and related objects.
- API Implementation: Create API endpoints for searching main objects based on keywords.
- Ensure that the results include both the main object and all related objects.
- Search Logic: Develop the search logic to organize results in the order of the closeness of matches.
- Documentation: Document your database schema, API endpoints, and search logic.

## Submission Details:
Please provide a GitHub repository link containing your project code and documentation.
Note: You are encouraged to go beyond the scope given here. Good luck. 
