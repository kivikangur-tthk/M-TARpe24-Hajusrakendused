<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output encoding="UTF-8" method="text" />
<xsl:template match="/">Esimene:<xsl:value-of select="/inimesed/inimene[1]/eesnimi" />;
Viimane:<xsl:value-of select="/inimesed/inimene[last()]/eesnimi" />
</xsl:template>
</xsl:stylesheet>
