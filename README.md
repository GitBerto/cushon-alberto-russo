# Cushon ISA Investment Platform

## Project Overview

This project implements a solution for Cushon's technical assessment. The implementation focuses on demonstrating software design principles, clean architecture, and engineering practices rather than overengineering the solution.

## Problem Analysis

The challenge involves developing functionality that allows retail customers to invest in ISAs through Cushon's platform, with the following requirements:

1. Offer ISA investments to retail customers separately from employer-based offerings
2. Allow customers to select only one single fund from available options
3. Enable customers to specify their investment amount
4. Record and store these selections for future reference
5. Support the specific use case: a customer investing £25,000 into the Cushon Equities Fund

## Solution Approach

I approached this task with careful consideration of the assessment's purpose and constraints. My focus was on balancing solution complexity, functionality demonstration, and showcasing my engineering thought process within a reasonable timeframe (4-8 hours).

### User Journey

I designed the solution around a straightforward user journey:
1. User accesses a landing page (Home)
2. User navigates to the product page (Invest) displaying available funds with specifications
3. User selects a fund and specifies an investment amount
4. User completes the investment and is redirected to a Dashboard that displays both:
   - The current transaction details
   - A summary of all previous investments
5. User can add new funds to same ISA previously selected

### Technical Decisions

#### Framework & Libraries
- **Next.js**: Selected for its built-in routing capabilities and future-proofing through server-side rendering support
- **TypeScript**: Implemented for type safety, improved developer experience, and reduction of runtime errors
- **Styled Components**: Chosen to demonstrate component styling abilities without relying on third-party component libraries

#### Architecture
- Implemented a clean separation of concerns
- Kept component structure simple but maintainable, with styled components defined alongside JSX in the same files
- Created a mock API system that simulates backend data operations

#### SEO & Future Considerations
The use of Next.js was strategically chosen with the assumption that ISA products could serve as organic customer acquisition funnels in the future, requiring strong SEO capabilities through server-side rendering.

## Key Assumptions

To scope the implementation appropriately, I made the following assumptions:

1. Users are pre-authenticated (login functionality is out of scope)
2. Data persistence is temporary and in-memory on the server side (resets on server restart)
3. The application focuses on core functionality rather than comprehensive error handling or edge cases
4. The project serves as an MVP or technical demonstration rather than a production-ready system

## Project Structure

```
app/                    # Global components, pages and definitions
├── dashboard           # Dashboard page
├── invest              # Invest page
├── page.tsx            # Homepage
├── api/                # API endpoints

components/             # Reusable UI components
context/                # Store
lib/                    # Mock data
models/                 # Type definitions
styles/                 # Global styles
__tests__/          # Test files
```

## Implementation Details

### Data Flow
1. Available funds are fetched from the API
2. User selections are validated client-side
3. Investment decisions are submitted to the API
4. Transaction data is stored in memory
5. Dashboard queries the API for transaction history

### Testing Strategy
The solution includes basic Jest unit tests focusing on:
- API interaction
- Business logic validation

With more time, I would expand the testing strategy to include a comprehensive testing pyramid:
- Improve TypeScript type checking and interfaces
- Comprehensive unit tests with higher coverage
- Component isolation tests
- Integration tests
- End-to-end tests

## Future Enhancements

Given additional time and resources, I would consider:

1. **Persistent Storage**: Implement a proper database solution
2. **Authentication Flow**: Add complete user authentication and authorization
3. **Multiple Fund Selection**: Expand functionality to allow investing in multiple funds
4. **Advanced Validation**: Implement comprehensive form validation and error handling
5. **Comprehensive Testing**: Implement the full testing pyramid
6. **Accessibility**: Ensure WCAG compliance

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test
```

## Design Decisions Explained

### Why Next.js?
Next.js provides a solid foundation for both current requirements and future scalability. Its built-in API routes simplified the implementation of mock endpoints, while its rendering options support potential SEO requirements for customer acquisition.

### Why In-Memory Storage?
For this assessment, implementing a full database would overcomplicate the solution. The in-memory approach demonstrates the data flow patterns while keeping the implementation straightforward.

### Component Structure
I deliberately avoided overengineering the component hierarchy to maintain readability while demonstrating proper separation of concerns. Components are structured to be reusable but not overly abstracted.

### Event-Driven Architecture Considerations
While not fully implemented in this MVP, the solution is structured to easily adopt an event-driven architecture in a production environment, which would be appropriate for financial transactions that require audit trails and eventual consistency.

## Conclusion

This implementation demonstrates my approach to software engineering problems: analywing requirements, making pragmatic technical decisions, and building solutions that balance immediate needs with future scalability. The code prioritises readability, maintainability avoiding unnecessary complexity.
