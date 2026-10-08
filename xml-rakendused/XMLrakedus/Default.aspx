<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="XMLrakedus._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <main>
        <h2>Inimesed</h2>
        <asp:Xml ID="xml1" runat="server" DocumentSource="~/inimesed.xml" TransformSource="~/inimesed1.xslt" />
        <h2>Autod</h2>
        <asp:Xml ID="xml2" runat="server" DocumentSource="~/autod.xml" TransformSource="~/autod1.xslt" />
    </main>

</asp:Content>
