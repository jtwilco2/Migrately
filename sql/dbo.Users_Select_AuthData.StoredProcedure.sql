CREATE proc [dbo].[Users_Select_AuthData]
			@Email nvarchar(255)

/*
Declare @Email nvarchar(255) = 'sample@domain.com'

Execute [dbo].[Users_Select_AuthData] @Email
*/

AS

BEGIN

Declare @Id int

SELECT @Id = [Id]
FROM dbo.Users
WHERE Email = @Email

SELECT [Id]
	  ,[Email]
      ,[Password]
	  ,Roles =(
			SELECT r.Name as name
					
			FROM dbo.Roles as r 
			inner join dbo.UserRoles as ur
			on r.Id = ur.RoleId
			WHERE ur.UserId = @Id
			For JSON AUTO
			)
  FROM [dbo].[Users]

  WHERE Email = @Email

END


GO
