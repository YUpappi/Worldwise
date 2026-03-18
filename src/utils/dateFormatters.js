export const formatDate = (date) => {
  if (!date) return "No Date Provided"; // Handle the case when date is not provided
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    console.error("Invalid date:", date);
    return "Invalid Date"; // Return a default message or handle the error as needed
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(dateObj);
};
