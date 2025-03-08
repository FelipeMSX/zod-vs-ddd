export function onlyAlphaNumeric(raw: string): boolean {
    const regexp = new RegExp(`^\\w+$`);
    return regexp.test(raw);
}
