/* eslint-disable operator-linebreak */
export const template = {}

template.schema =
`--------------------------------
-- #schemaName# schema and tables
--------------------------------

CREATE SCHEMA "#schemaName#";

CREATE SEQUENCE "#schemaName#".#schemaName#_id_seq;

CREATE OR REPLACE FUNCTION "#schemaName#".#schemaName#_id
(OUT result bigint) AS $$
DECLARE
  our_epoch bigint := 1466352806721;
  seq_id bigint;
  now_millis bigint;
  shard_id int := 0;
BEGIN
  SELECT nextval('"#schemaName#".#schemaName#_id_seq') % 128
  INTO seq_id;
  SELECT FLOOR(EXTRACT(EPOCH FROM current_timestamp) * 1000)
  INTO now_millis;
  result :=
  (now_millis - our_epoch) << 12; 
result := result |
(shard_id << 7);
  result := result |
(seq_id);
END;
$$ LANGUAGE PLPGSQL;

#tablesCode#
`

template.table =
`--------------------------------
-- #tableName# notes:
--------------------------------

CREATE TABLE "#schemaName#".#tableName#
(
  #pkeyCode#
  #columnsCode#
  #timeCode#
  PRIMARY KEY (#pkeyName#)
)
WITH (
  OIDS=FALSE
);

CREATE TRIGGER last_updated
  BEFORE UPDATE
  ON "#schemaName#".#tableName#
  FOR EACH ROW
  EXECUTE PROCEDURE update_timestamp();
`
