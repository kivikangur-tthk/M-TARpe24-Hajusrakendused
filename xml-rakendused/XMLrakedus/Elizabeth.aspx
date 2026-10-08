<%@ Page Title="Elizabeth" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Elizabeth.aspx.cs" Inherits="XMLrakedus.Elizabeth" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <main aria-labelledby="title">
        <h2>Elizabeth</h2>
            <asp:Xml ID="xml1" runat="server" DocumentSource="~/elizabeth.xml" TransformSource="~/elizabeth.xslt" />
            <div>           
                Otsitav tekst:
                <asp:TextBox ID="kast1" runat="server" /><br />
                Miinimumpikkus:
                <asp:TextBox ID="kast2" runat="server" /><br />
                <asp:Button runat="server" Text="Sisesta" />
            </div>
    </main>
</asp:Content>
