package com.panda.overheard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.panda.overheard.web.rest.TestUtil;

public class TopicTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Topic.class);
        Topic topic1 = new Topic();
        topic1.setId("id1");
        Topic topic2 = new Topic();
        topic2.setId(topic1.getId());
        assertThat(topic1).isEqualTo(topic2);
        topic2.setId("id2");
        assertThat(topic1).isNotEqualTo(topic2);
        topic1.setId(null);
        assertThat(topic1).isNotEqualTo(topic2);
    }
}
