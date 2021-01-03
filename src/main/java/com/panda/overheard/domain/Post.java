package com.panda.overheard.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Post.
 */
@Document(collection = "post")
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(min = 2, max = 80)
    @Field("title")
    private String title;

    @NotNull
    @Size(min = 2, max = 4096)
    @Field("content")
    private String content;

    @NotNull
    @Field("date")
    private Instant date;

    @Field("rank_one")
    private Integer rankOne;

    @Field("rank_two")
    private Integer rankTwo;

    @Field("rank_three")
    private Integer rankThree;

    @Field("rank_four")
    private Integer rankFour;

    @Field("rank_five")
    private Integer rankFive;

    @Field("rank_six")
    private Integer rankSix;

    @Field("rank_seven")
    private Integer rankSeven;

    @DBRef
    @Field("overheardComment")
    private Set<OverheardComment> overheardComments = new HashSet<>();

    @DBRef
    @Field("user")
    @JsonIgnoreProperties(value = "posts", allowSetters = true)
    private User user;

    @DBRef
    @Field("topic")
    @JsonIgnoreProperties(value = "posts", allowSetters = true)
    private Topic topic;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Post title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public Post content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getDate() {
        return date;
    }

    public Post date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Integer getRankOne() {
        return rankOne;
    }

    public Post rankOne(Integer rankOne) {
        this.rankOne = rankOne;
        return this;
    }

    public void setRankOne(Integer rankOne) {
        this.rankOne = rankOne;
    }

    public Integer getRankTwo() {
        return rankTwo;
    }

    public Post rankTwo(Integer rankTwo) {
        this.rankTwo = rankTwo;
        return this;
    }

    public void setRankTwo(Integer rankTwo) {
        this.rankTwo = rankTwo;
    }

    public Integer getRankThree() {
        return rankThree;
    }

    public Post rankThree(Integer rankThree) {
        this.rankThree = rankThree;
        return this;
    }

    public void setRankThree(Integer rankThree) {
        this.rankThree = rankThree;
    }

    public Integer getRankFour() {
        return rankFour;
    }

    public Post rankFour(Integer rankFour) {
        this.rankFour = rankFour;
        return this;
    }

    public void setRankFour(Integer rankFour) {
        this.rankFour = rankFour;
    }

    public Integer getRankFive() {
        return rankFive;
    }

    public Post rankFive(Integer rankFive) {
        this.rankFive = rankFive;
        return this;
    }

    public void setRankFive(Integer rankFive) {
        this.rankFive = rankFive;
    }

    public Integer getRankSix() {
        return rankSix;
    }

    public Post rankSix(Integer rankSix) {
        this.rankSix = rankSix;
        return this;
    }

    public void setRankSix(Integer rankSix) {
        this.rankSix = rankSix;
    }

    public Integer getRankSeven() {
        return rankSeven;
    }

    public Post rankSeven(Integer rankSeven) {
        this.rankSeven = rankSeven;
        return this;
    }

    public void setRankSeven(Integer rankSeven) {
        this.rankSeven = rankSeven;
    }

    public Set<OverheardComment> getOverheardComments() {
        return overheardComments;
    }

    public Post overheardComments(Set<OverheardComment> overheardComments) {
        this.overheardComments = overheardComments;
        return this;
    }

    public Post addOverheardComment(OverheardComment overheardComment) {
        this.overheardComments.add(overheardComment);
        overheardComment.setPost(this);
        return this;
    }

    public Post removeOverheardComment(OverheardComment overheardComment) {
        this.overheardComments.remove(overheardComment);
        overheardComment.setPost(null);
        return this;
    }

    public void setOverheardComments(Set<OverheardComment> overheardComments) {
        this.overheardComments = overheardComments;
    }

    public User getUser() {
        return user;
    }

    public Post user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Topic getTopic() {
        return topic;
    }

    public Post topic(Topic topic) {
        this.topic = topic;
        return this;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Post)) {
            return false;
        }
        return id != null && id.equals(((Post) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Post{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", date='" + getDate() + "'" +
            ", rankOne=" + getRankOne() +
            ", rankTwo=" + getRankTwo() +
            ", rankThree=" + getRankThree() +
            ", rankFour=" + getRankFour() +
            ", rankFive=" + getRankFive() +
            ", rankSix=" + getRankSix() +
            ", rankSeven=" + getRankSeven() +
            "}";
    }
}
