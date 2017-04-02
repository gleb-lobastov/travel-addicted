import { v4 } from 'node-uuid';

const extractSymbol = /Symbol\((.*)\)/g;
const extractName = /.*_(.*)/g;

/**
 * Produce a sequence of unique identifiers for each action type
 */
export default function (domain) {
  return `${domain.toString().replace(extractSymbol, '$1').replace(extractName, '$1')}::${v4()}`;
}
