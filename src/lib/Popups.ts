/**
 * Utility functions for handling popup dialogs
 */

// Map for program to option selection
export const programToOption = {
  "B.TECH": "Study Abroad Counseling",
  "MBBS In Abroad": "Visa Assistance",
  "Masters In US/UK": "University Selection",
  "Edu Loans": "Scholarship Guidance"
};

// Create a custom event for showing the popup with optional pre-selected option
export const showCallbackPopup = (program?: string) => {
  // Dispatch a custom event that can be listened for in the DelayedPopup component
  const event = new CustomEvent('showCallbackPopup', { 
    detail: program ? { selectedOption: program } : {}
  });
  window.dispatchEvent(event);
};

export const openGreenPopup = (program?: string) => {
  // Trigger the callback popup with optional program selection
  showCallbackPopup(program);
};

// Reset popup preferences in localStorage
export const resetPopupPreferences = () => {
  localStorage.removeItem('vsource_form_submitted');
  sessionStorage.removeItem('vsource_popup_shown');
  // Clear the canceled flag to allow the popup to show again
  sessionStorage.removeItem('popup_canceled');
}; 