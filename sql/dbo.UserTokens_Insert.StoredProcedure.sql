CREATE proc [dbo].[UserTokens_Insert]
			@Token varchar(200)
			,@UserId int
			,@TokenType int
/*
Declare
			@Token varchar(200)= NEWID()
			,@UserId int = 1
			,@TokenType int = 1

Execute dbo.UserTokens_Insert
			@Token
           ,@UserId
           ,@TokenType

Execute dbo.UserTokens_Select_ByTokenType
		@TokenType
*/

AS

BEGIN

INSERT INTO [dbo].[UserTokens]
           ([Token]
           ,[UserId]
           ,[TokenType])
     VALUES
           (@Token
           ,@UserId
           ,@TokenType)
END


GO
