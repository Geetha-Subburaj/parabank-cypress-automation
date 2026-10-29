/** Date utilities. ParaBank date fields commonly use M/D/YYYY; verify against the live page. */
class DateUtils {
  private formatUsDate(date: Date): string { return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`; }
  today(): string { return this.formatUsDate(new Date()); }
  daysAgo(days: number): string {
    if (!Number.isInteger(days) || days < 0) throw new Error(`days must be a non-negative integer; received ${days}`);
    const date = new Date(); date.setDate(date.getDate()-days); return this.formatUsDate(date);
  }
}
export default new DateUtils();
