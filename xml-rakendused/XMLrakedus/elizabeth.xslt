<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output encoding="UTF-8" method="html" />
	<xsl:param name="otsing"></xsl:param>
	<xsl:param name="pikkus">0</xsl:param>
	<xsl:template match="/">
		<h4>Sünniaastad</h4>
		<xsl:for-each select="//pereliige">
			<xsl:value-of select="nimi"/>
			<xsl:text xml:space="preserve"> </xsl:text>
			<xsl:value-of select="@synniaasta"/><br />
		</xsl:for-each>
		<h4>Vähemalt kaks last</h4>
		<xsl:for-each select="//pereliige">
			<xsl:if test="count(*/pereliige) &gt; 1">
				<xsl:value-of select="nimi"/>
				<br />
			</xsl:if>
		</xsl:for-each>
		<h4>Sugupuu tabelina</h4>
		<table border="1">
			<tr>
				<th>Nimi</th>
				<th>Sünniaasta</th>
				<th>Lapsed</th>
				<th>Vanemad</th>
				<th>Vanavanemad</th>
				<th>Vanus</th>
				<th>Vanema vanus sünnipäeval</th>
			</tr>
			<xsl:for-each select="//pereliige[contains(nimi, $otsing) and string-length(nimi) &gt; $pikkus]">
				<tr style="border:1px solid black">					
					<td style="border:1px solid black">
						<xsl:attribute name="style">
							<xsl:if test="string-length(nimi) &lt; 7">
								background-color: green
							</xsl:if>
						</xsl:attribute>
						<xsl:value-of select="nimi"/>
					</td>
					<td>							
						<xsl:value-of select="@synniaasta"/>
					</td>					
					<td style="border:1px solid black">
					<xsl:for-each select="*/*">
							<xsl:value-of select="nimi"/>,
					</xsl:for-each>						
					</td>
					<td style="border:1px solid black">
						<xsl:value-of select="../../nimi"/>
					</td>
					<td style="border:1px solid black">
						<xsl:value-of select="../../../../nimi"/>
					</td>
					<td style="border:1px solid black">
						<xsl:value-of select="2026 - @synniaasta"/>
						<xsl:if test="count(*/pereliige) = 0">
							<xsl:text xml:space="preserve"> Laps</xsl:text>
						</xsl:if>
					</td>
					<td style="border:1px solid black">
						<xsl:variable name="lapseVanus" select="2026 - @synniaasta"></xsl:variable>
						<xsl:variable name="vanemaVanus" select="2026 - ../../@synniaasta"></xsl:variable>						
						<xsl:value-of select="$vanemaVanus - $lapseVanus"/>
					</td>
				</tr>
			</xsl:for-each>			
		</table>
	</xsl:template>

</xsl:stylesheet>