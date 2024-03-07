//package com.university.codesolution.login.component;
//import static org.junit.Assert.assertEquals;
//import static org.mockito.Mockito.mock;
//import static org.mockito.Mockito.when;
//
//import com.university.codesolution.login.entity.User;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import org.junit.Before;
//import org.junit.Test;
//public class Unitest {
//    private JwtTokenUtils jwtTokenUtils;
//
//    @Before
//    public void setUp() {
//        jwtTokenUtils = new JwtTokenUtils();
//        jwtTokenUtils.secretKey = jwtTokenUtils.generateSecretKey();
//        jwtTokenUtils.expiration = 2592000; // Expiration time in seconds
//    }
//
//    @Test
//    public void testGenerateToken() throws Exception {
//        // Create a mock User object
//        User user = mock(User.class);
//        when(user.getPhoneNumber()).thenReturn("123456789");
//        when(user.getId()).thenReturn(1L);
//        when(user.getEmail()).thenReturn("nguyenduy@gmail.com");
//
//        // Generate the token
//        String token = jwtTokenUtils.generateToken(user);
//        System.out.println(token);
//        String secretKey= jwtTokenUtils.generateSecretKey();
//        System.out.println(secretKey);
//        // Parse the token to validate its claims
//        Claims claims = Jwts.parser()
//                .setSigningKey(jwtTokenUtils.getSignKey())
//                .parseClaimsJws(token)
//                .getBody();
//        System.out.println(claims);
//        // Verify the claims in the token
//        assertEquals("123456789", claims.get("phoneNumber"));
//        assertEquals(Integer.valueOf(1), claims.get("userId"));
//        assertEquals("nguyenduy@gmail.com",claims.get("email"));
//        assertEquals("123456789", claims.getSubject());
//    }
//}
