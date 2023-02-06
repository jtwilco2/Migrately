using Sabio.Models.Domain.KeyValues;
using System.Collections.Generic;

namespace Sabio.Models.Domain.PageSection
{
    public class PageSectionV2
    {
        public int Id { get; set; }        
        public string Section { get; set; }
        public string Component { get; set; }
        public int PageTranslationId { get; set; }
        public List<KeyValue> KeyValues { get; set; }
    }
}
