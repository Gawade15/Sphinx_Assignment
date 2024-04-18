using System.ComponentModel.DataAnnotations;

namespace AspReact.Models
{
    public class Customer
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }

    }
}
