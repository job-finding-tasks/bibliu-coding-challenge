const { parse: parseXML } = require("fast-xml-parser");
const { replace, map, get, first, isArray, isEmpty } = require("lodash");

// RDF keys we are accessing from the parsed Gutenberg data
const RDF_KEYS = {
  rdfRoot: "rdf:RDF",
  ebook: "pgterms:ebook",
  about: "@_rdf:about",
  title: "dcterms:title",
  creator: "dcterms:creator",
  agent: "pgterms:agent",
  name: "pgterms:name",
  publisher: "dcterms:publisher",
  issued: "dcterms:issued",
  text: "#text",
  language: "dcterms:language",
  description: "rdf:Description",
  value: "rdf:value",
  subject: "dcterms:subject",
  rights: "dcterms:rights",
};

/**
 * Parses and returns parsed Gutenberg data
 *
 * @param {*} gutenbergRDFData
 */
const parseFileContent = (gutenbergRDFData) => {
  const data = parseXML(gutenbergRDFData, {
    ignoreAttributes: false,
  });

  const ebook = get(data, `${RDF_KEYS.rdfRoot}.${RDF_KEYS.ebook}`);

  const id = replace(get(ebook, `${RDF_KEYS.about}`), "ebooks/", "");

  const parsedTitle = get(ebook, `${RDF_KEYS.title}`);
  const title = isArray(parsedTitle) ? first(parsedTitle) : parsedTitle;

  const author = get(
    ebook,
    `${RDF_KEYS.creator}.${RDF_KEYS.agent}.${RDF_KEYS.name}`,
  );

  const publisher = get(ebook, `${RDF_KEYS.publisher}`);

  const parsedPublicationDate = get(
    ebook,
    `${RDF_KEYS.issued}.${RDF_KEYS.text}`,
  );
  const publicationDate = isEmpty(parsedPublicationDate)
    ? undefined
    : new Date(parsedPublicationDate);

  const language = get(
    ebook,
    `${RDF_KEYS.language}.${RDF_KEYS.description}.${RDF_KEYS.value}.${RDF_KEYS.text}`,
  );

  const subjects = map(
    get(ebook, `${RDF_KEYS.subject}`),
    `${RDF_KEYS.description}.${RDF_KEYS.value}`,
  );

  const licenseRights = get(ebook, `${RDF_KEYS.rights}`);

  return {
    id: !isNaN(id) && parseInt(id),
    title,
    author,
    publisher,
    publicationDate,
    language,
    subjects,
    licenseRights,
  };
};

module.exports = { parseFileContent };
