import React from 'react';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';
import MapComponent from './MapComponent.jsx';

test("renders MapComponent without crashing", () => {
  render(<MapComponent />);
});

test("handles toggle free draw click", async () => {
  // Render the component
  render(<MapComponent />);

  // Click the "Enable Free Draw" button
  fireEvent.click(screen.getByText("Enable Free Draw"));

  // Assert that the state or any visible change reflects the button click
  // For example, you can check if the FreeDraw mode is enabled or if a relevant UI element is present
  // Modify the assertions based on the expected behavior
  expect(/* your assertion here */).toBe(/* expected value */);
});

test("handles place marker click", async () => {
  // Render the component
  render(<MapComponent />);

  // Click the "Place Marker" button
  fireEvent.click(screen.getByText("Place Marker"));

  // Assert that the state or any visible change reflects the button click
  // For example, you can check if the UI is in a state that allows placing a marker
  // Modify the assertions based on the expected behavior
  expect(/* your assertion here */).toBe(/* expected value */);
});

test("handles toggle delete mode click", async () => {
  // Render the component
  render(<MapComponent />);

  // Click the "Enable Delete Mode" button
  fireEvent.click(screen.getByText("Enable Delete Mode"));

  // Assert that the state or any visible change reflects the button click
  // For example, you can check if the Delete mode is enabled or if a relevant UI element is present
  // Modify the assertions based on the expected behavior
  expect(/* your assertion here */).toBe(/* expected value */);
});
  
// test('handles marker popup display', async () => {
//     // Render the component with a known marker position
//     render(<MapComponent />);
    
//     // Trigger an event that displays the marker (e.g., place a marker or select a city)
//     // Modify the test based on your actual UI behavior
//     fireEvent.click(/* simulate an event that triggers marker display */);
    
//     // Assert that the marker popup is displayed or any relevant state is updated
//     // Modify the assertions based on the expected behavior
//     expect(/* your assertion here */).toBe(/* expected value */);
//   });
  
//   test('handles city selection with mock data', async () => {
//     // Mock the fetch function to return a specific response for reverse geocoding
//     global.fetch = jest.fn().mockResolvedValueOnce({
//       json: jest.fn().mockResolvedValueOnce({
//         address: {
//           city: 'MockCity',
//         },
//       }),
//     });
    
//     // Render the component
//     render(<MapComponent />);
    
//     // Trigger a map click event to simulate city selection
//     fireEvent.click(/* simulate a map click event */);
    
//     // Assert that the state or any visible change reflects the mock city selection
//     // Modify the assertions based on the expected behavior
//     expect(/* your assertion here */).toBe(/* expected value */);
//   });
  
  test('handles delete mode state change', async () => {
    // Render the component
    render(<MapComponent />);
    
    // Trigger the delete mode state change (e.g., by clicking the "Enable Delete Mode" button)
    fireEvent.click(screen.getByText('Enable Delete Mode'));
    
    // Assert that the delete mode state is changed or any relevant state is updated
    // Modify the assertions based on the expected behavior
    expect(/* your assertion here */).toBe(/* expected value */);
  });
  
  test('handles drawing mode state change', async () => {
    // Render the component
    render(<MapComponent />);
    
    // Trigger the drawing mode state change (e.g., by clicking the "Enable Free Draw" button)
    fireEvent.click(screen.getByText('Enable Free Draw'));
    
    // Assert that the drawing mode state is changed or any relevant state is updated
    // Modify the assertions based on the expected behavior
    expect(/* your assertion here */).toBe(/* expected value */);
  });
  
//   test('handles marker placement', async () => {
//     // Render the component
//     render(<MapComponent />);
    
//     // Trigger a map click event to simulate marker placement
//     fireEvent.click(/* simulate a map click event */);
    
//     // Assert that the marker is placed or any relevant state is updated
//     // Modify the assertions based on the expected behavior
//     expect(/* your assertion here */).toBe(/* expected value */);
//   });
  
  test('handles escape key press', async () => {
    // Render the component
    render(<MapComponent />);
    
    // Trigger the escape key press event
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Assert that the state or any visible change reflects the escape key press
    // For example, you can check if FreeDraw action is canceled or if any relevant state is updated
    // Modify the assertions based on the expected behavior
    expect(/* your assertion here */).toBe(/* expected value */);
  });
  
  test('handles count houses within polygons click', async () => {
    // Render the component
    render(<MapComponent />);
    
    // Trigger the "Count Houses in Polygons" button click
    fireEvent.click(screen.getByText('Count Houses in Polygons'));
    
    // Assert that the state or any visible change reflects the house count within polygons
    // For example, you can check if the count is displayed or if any relevant state is updated
    // Modify the assertions based on the expected behavior
    expect(/* your assertion here */).toBe(/* expected value */);
  });
  
//   test('handles city selection', async () => {
//     // Render the component
//     render(<MapComponent />);
    
//     // Trigger a map click event to simulate city selection
//     fireEvent.click(/* simulate a map click event */);
    
//     // Assert that the state or any visible change reflects the city selection
//     // For example, you can check if the selected city is displayed or if any relevant state is updated
//     // Modify the assertions based on the expected behavior
//     expect(/* your assertion here */).toBe(/* expected value */);
//   });
  


































// test('handles map click and fetches city correctly', async () => {
//   // Mock the fetch function to return a specific response
//   global.fetch = jest.fn().mockResolvedValueOnce({
//     json: jest.fn().mockResolvedValueOnce({
//       address: {
//         city: 'København',
//       },
//     }),
//   });

//   // Render the component
//   render(<MapComponent />);

// // Log component state before the click
// screen.debug();

// // Simulate a map click
// act(() => {
//   fireEvent.click(screen.getByRole('presentation'));
// });

// // Log component state after the click
// screen.debug();


// await waitFor(() => {
//     expect(screen.findByText('City returned by reverse geocoding: København')).toBeInTheDocument();
//   }, { timeout: 5000 }); // Adjust the timeout value as needed
  
  
//   // Assert that the expected city is logged to the console
//   expect(console.log).toHaveBeenCalledWith('City returned by reverse geocoding:', 'København');
// });
