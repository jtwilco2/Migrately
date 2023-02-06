using Sabio.Models.Domain.Languages;
using Sabio.Models.Domain.PageSection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.PageTranslation
{
    public class PageTranslationV2
    {
        public int Id { get; set; }
        public string Link { get; set; }
        public List<Language> Language { get; set; }
        public List<PageSectionV2> PageSection { get; set; }
    }
}
