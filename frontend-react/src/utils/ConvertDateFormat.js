export const ConvertDateFormat = (date) => {
    let d = new Date(date);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}