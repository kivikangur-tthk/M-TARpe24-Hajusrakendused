<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output encoding="UTF-8" method="html" />
	<xsl:template match="/">
		Registrinumber: <xsl:value-of select="/autod/auto[1]/reg-number" />;<br/>
		Registrinumbri numbrid: <xsl:value-of select="substring(/autod/auto[1]/reg-number,1,3)" />;<br/>
		Registrinumbri tähed: <xsl:value-of select="substring(/autod/auto[1]/reg-number,4,3)" />;<br/>
		Perenimi:<xsl:value-of select="/autod/auto[1]/omanik" />;<br/>
		Perenime algustäht: <xsl:value-of select="substring(/autod/auto[1]/omanik,1,1)" />;<br/>
		Perenime lõputäht: <xsl:value-of select="substring(/autod/auto[1]/omanik,string-length(/autod/auto[1]/omanik),1)" />;<br/>
		<br/>
		Kaalikas omandis on <xsl:value-of select="count(/autod/auto[omanik='Kaalikas'])" /> autot<br/>
		M-tähega omanikke on <xsl:value-of select="count(/autod/auto[substring(omanik,1,1)='M'])" /> <br/>
		Lõppeb ühega <xsl:value-of select="count(/autod/auto[substring(reg-number,3,1)=1])" /> autot<br/>
		Lõppeb 1 või 2 - <xsl:value-of select="count(/autod/auto[substring(reg-number,3,1) &lt; 3])" /> autot<br/>
		<br/>
		<xsl:for-each select="/autod/auto">
			<div>
			<xsl:if test="substring(reg-number,3,1)=1 or substring(reg-number,3,1)=2">
				<xsl:attribute name="style">
					font-weight:bold
				</xsl:attribute>
			</xsl:if>				
				<xsl:value-of select="position()" />
				Auto: <xsl:value-of select="reg-number"/>
				<xsl:if test="substring(reg-number,3,1)=5 and false">
					Ülevaatuse kuu on juuli
				</xsl:if>
				Omanik: <xsl:value-of select="omanik"/>
				<xsl:if test="contains(omanik, 'x')">
					välismaalane
				</xsl:if>
				<xsl:if test="not(contains(omanik, 'x'))">
					pärismaalane
				</xsl:if>				
			</div>
		</xsl:for-each>
		<br/>
		<table>
			<tr>
				<th>Registrinumber</th>
				<th>Omanik</th>
			</tr>
		<xsl:for-each select="/autod/auto">
			<tr>
				<xsl:attribute name="style">
					<xsl:if test="position() mod 2 = 1">
						background-color:lightgray
					</xsl:if>
				</xsl:attribute>
				<td><xsl:value-of select="reg-number"/></td>
				<td><xsl:value-of select="omanik"/></td>
			</tr>
		</xsl:for-each>
		</table>
		<br/>
		<table>
			<tr>
				<th>Registrinumber</th>
				<th>Omanik</th>
			</tr>
		<xsl:for-each select="/autod/auto">
			<tr>
				<xsl:attribute name="style">
					<xsl:if test="position() mod 3 = 1">
						background-color:lightgray
					</xsl:if>
					<xsl:if test="position() mod 3 = 2">
						background-color:lightyellow
					</xsl:if>
				</xsl:attribute>
				<td><xsl:value-of select="reg-number"/></td>
				<td><xsl:value-of select="omanik"/></td>
			</tr>
		</xsl:for-each>
		</table>


		
	</xsl:template>
</xsl:stylesheet>
