<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output encoding="UTF-8" method="html" />
	<xsl:template match="/">
		Esimene:<xsl:value-of select="/inimesed/inimene[1]/eesnimi" />;<br/>
		Viimane:<xsl:value-of select="/inimesed/inimene[last()]/eesnimi" /><br/>
		Esimesed kolm perenime:<br/>
		<xsl:value-of select="/inimesed/inimene[1]/perenimi" />, Sugu: <xsl:value-of select="/inimesed/inimene[1]/sugu" />;<br/>
		<xsl:value-of select="/inimesed/inimene[2]/perenimi" />, Sugu: <xsl:value-of select="/inimesed/inimene[2]/sugu" />;<br/>
		<xsl:value-of select="/inimesed/inimene[3]/perenimi" />, Sugu: <xsl:value-of select="/inimesed/inimene[3]/sugu" />;<br/>
		Eelviimane nimi:
		<xsl:value-of select="/inimesed/inimene[last()-1]/eesnimi" /><br/>
		
		<br/>
		<table>
			<tr>
				<th>Inimeste vanuste vahe</th>
				<xsl:for-each select="/inimesed/inimene">
					<th>
						<xsl:value-of select="concat(eesnimi, ', ', synd)"></xsl:value-of>
					</th>
				</xsl:for-each>
			</tr>
			<xsl:for-each select="/inimesed/inimene">
				<tr>
					<xsl:variable name="v2limine" select="." />
					<td>
						<xsl:value-of select="eesnimi" />
					</td>
					<xsl:for-each select="/inimesed/inimene">
						<td>
							<xsl:variable name="vanusevahe" select="number(synd)-number($v2limine/synd)" />
							<xsl:attribute name="style">
								<xsl:if test="-6 &lt; $vanusevahe and $vanusevahe &lt; 6">
									background-color: orange
								</xsl:if>
							</xsl:attribute>
							
							<xsl:value-of select="$vanusevahe" />
						</td>
					</xsl:for-each>
				</tr>
			</xsl:for-each>
		</table>
		<br />
		<table>
			<tr>
				<th>Inimeste vanuste vahe</th>
				<xsl:for-each select="/inimesed/inimene">
					<th>
						<xsl:value-of select="concat(eesnimi, ', ', synd)"></xsl:value-of>
					</th>
				</xsl:for-each>
			</tr>
			<xsl:for-each select="/inimesed/inimene">
				<tr>
					<xsl:variable name="v2limine" select="." />
					<td>
						<xsl:value-of select="eesnimi" />
					</td>
					<xsl:for-each select="/inimesed/inimene">
						<td>
							<xsl:if test="position() = $v2limine">
								<xsl:value-of select="$v2limine/perenimi" /> ja
								<xsl:value-of select="perenimi"/>								
							</xsl:if>

						</td>
					</xsl:for-each>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
</xsl:stylesheet>
