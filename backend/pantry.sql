\echo 'Delete and recreate pantry db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pantry;
CREATE DATABASE pantry;
\connect pantry

\i pantry-schema.sql


\echo 'Delete and recreate pantry_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pantry_test;
CREATE DATABASE pantry_test;
\connect pantry_test

\i pantry-schema.sql
