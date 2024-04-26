ARG FF_VERSION=latest

FROM frankframework/frankframework:${FF_VERSION} as ff-base

## Uncomment this section if the Frank! contains custom classes.
# Copy dependencies
COPY --chown=tomcat lib/server/ /usr/local/tomcat/lib/
COPY --chown=tomcat lib/webapp/ /usr/local/tomcat/webapps/ROOT/WEB-INF/lib/

# Compile custom class
FROM eclipse-temurin:17-jdk-jammy AS custom-code-builder

# Copy dependencies
COPY --from=ff-base /usr/local/tomcat/lib/ /usr/local/tomcat/lib/
COPY --from=ff-base /usr/local/tomcat/webapps/ROOT /usr/local/tomcat/webapps/ROOT

# Copy custom class
COPY src/main/java /tmp/java
RUN mkdir /tmp/classes && \
    javac \
    /tmp/java/org/<path-to-customcode-file>.java \
    -classpath "/usr/local/tomcat/webapps/ROOT/WEB-INF/lib/*:/usr/local/tomcat/lib/*" \
    -verbose -d /tmp/classes

FROM ff-base

# Copy database connection settings
COPY --chown=tomcat src/main/webapp/META-INF/context.xml /usr/local/tomcat/conf/Catalina/localhost/ROOT.xml

# Copy Frank!
COPY --chown=tomcat src/main/configurations/ /opt/frank/configurations/
COPY --chown=tomcat src/main/resources/ /opt/frank/resources/
COPY --chown=tomcat src/test/testtool/ /opt/frank/testtool/

## Uncomment this section if the Frank! contains custom classes.
# # Copy compiled custom class
# COPY --from=custom-code-builder --chown=tomcat /tmp/classes/ /usr/local/tomcat/webapps/ROOT/WEB-INF/classes

# COPY --chown=tomcat entrypoint.sh /scripts/entrypoint.sh

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=60 \
	CMD curl --fail --silent http://localhost:8080/iaf/api/server/health || (curl --silent http://localhost:8080/iaf/api/server/health && exit 1)

# ENTRYPOINT ["/scripts/entrypoint.sh"]
# CMD ["catalina.sh", "run"]
