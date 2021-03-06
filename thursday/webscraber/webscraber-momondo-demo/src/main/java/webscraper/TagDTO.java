package webscraper;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;
import java.util.List;


class TagDTOs {
    public String title;
    public String timeSpent;
    List<TagDTO> tags = new ArrayList<>();
    

    public TagDTOs(String title, List<TagDTO> tags,long time) {
     this.timeSpent = "" +((time) / 1_000_000) + " ms.";
     this.tags = tags; 
     this.title = title;
    }
}

public class TagDTO {
  private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

  public TagDTO(TagCounter tc) {
    this.url = tc.getUrl();
    this.divCount = tc.getDivCount();
    this.bodyCount = tc.getBodyCount();
  }
  
  public static String getTagsAsJson(String title, List<TagCounter> tagCounters,long time){
    List<TagDTO> tagCounterDTOs = new ArrayList<>();
    for(TagCounter tc : tagCounters){
        tagCounterDTOs.add(new TagDTO(tc));
    }
    return GSON.toJson(new TagDTOs(title, tagCounterDTOs,time));
   }
  
  public static String getTagsAsJsonPara(String parralel_fetching, List<TagDTO> dataFeched, long endTime) {
        List<TagDTO> tagCounterDTOs = new ArrayList<>();
        for (TagDTO tc : dataFeched) {
            tagCounterDTOs.add(new TagDTO(tc));
        }
        return GSON.toJson(new TagDTOs(parralel_fetching, tagCounterDTOs, endTime));
    }

    private TagDTO(TagDTO tc) {
        this.url = tc.getUrl();
        this.divCount = tc.getDivCount();
        this.bodyCount = tc.getBodyCount();
    }
  
  public String url;
  public int divCount;
  public int bodyCount;

    public static Gson getGSON() {
        return GSON;
    }

    public String getUrl() {
        return url;
    }

    public int getDivCount() {
        return divCount;
    }

    public int getBodyCount() {
        return bodyCount;
    }
  
  
}