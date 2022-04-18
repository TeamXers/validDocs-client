export function formatDate(dateString: string) {
    const formatter = new Intl.DateTimeFormat(
        'en-gb',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );
    return formatter.format(new Date(dateString));
}
