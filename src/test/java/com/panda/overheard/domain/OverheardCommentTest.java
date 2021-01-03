package com.panda.overheard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.panda.overheard.web.rest.TestUtil;

public class OverheardCommentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OverheardComment.class);
        OverheardComment overheardComment1 = new OverheardComment();
        overheardComment1.setId("id1");
        OverheardComment overheardComment2 = new OverheardComment();
        overheardComment2.setId(overheardComment1.getId());
        assertThat(overheardComment1).isEqualTo(overheardComment2);
        overheardComment2.setId("id2");
        assertThat(overheardComment1).isNotEqualTo(overheardComment2);
        overheardComment1.setId(null);
        assertThat(overheardComment1).isNotEqualTo(overheardComment2);
    }
}
