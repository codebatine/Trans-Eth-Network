export function formatTransaction(transaction) {
  const fields = ['from', 'to', 'value', 'gas', 'gasPrice'];
  return fields
    .map(
      (field) =>
        `${field.charAt(0).toUpperCase() + field.slice(1)}: ${
          transaction[field]
        }`,
    )
    .join('\n');
}
