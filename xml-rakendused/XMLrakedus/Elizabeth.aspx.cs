using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Xsl;

namespace XMLrakedus
{
    public partial class Elizabeth : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            XsltArgumentList p = new XsltArgumentList();
            p.AddParam("otsing", "", kast1.Text);
            int abi;
            if (int.TryParse(kast2.Text, out abi))
            {
                p.AddParam("pikkus", "", kast2.Text);
            }
            xml1.TransformArgumentList = p;
        }
    }
}