/**
 * Generates a URL-friendly slug from a string.
 */
export function generateSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')         // Replace spaces with hyphens
      .replace(/-+/g, '-')          // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '');       // Remove leading/trailing hyphens
  }
  

  export function normalizeDate(dateString: string): string {
    const value = dateString.trim();
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = dateRegex.exec(value);
  
    if (!match) {
      throw new Error('Invalid date format. Expected YYYY-MM-DD');
    }
  
    const year = parseInt(match[1]);
    const month = parseInt(match[2]);
    const day = parseInt(match[3]);
    
    // Create a Date object to check if the day exists (e.g., prevents Feb 30)
    const date = new Date(year, month - 1, day);
  
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      throw new Error('The provided date is not a valid calendar date');
    }
  
    return value;
  }
  

  export function normalizeTime(timeString: string): string {
    const cleaned = timeString.trim().toUpperCase();
    
    const timeRegex = /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/;
    const match = cleaned.match(timeRegex);
    
    if (!match) {
      throw new Error('Invalid time format. Use HH:MM or HH:MM AM/PM');
    }
    
    let hours = parseInt(match[1]);
    const minutes = match[2];
    const period = match[3];
    
    if (period) {
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
    }
    
    if (hours < 0 || hours > 23 || parseInt(minutes) > 59) {
      throw new Error('Time values are out of range');
    }
    
    const h = hours.toString().padStart(2, '0');
    const m = minutes.padStart(2, '0');
    
    return `${h}:${m}`;
  }