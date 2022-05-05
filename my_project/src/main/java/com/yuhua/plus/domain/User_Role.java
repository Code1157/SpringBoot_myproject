package com.yuhua.plus.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("user_role")
@Component
public class User_Role {
    private Long userId;  // 用户ID
    private Long roleId;  // 角色ID
}
