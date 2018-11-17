namespace DatingApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string URL { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public boolean IsMain { get; set; }
        
    }
}