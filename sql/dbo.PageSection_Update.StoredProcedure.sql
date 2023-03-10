CREATE proc [dbo].[PageSection_Update]
	@Name nvarchar(100)
	,@Component nvarchar(100)
	,@PageTranslationId int
	,@Id int

as

/* -----------Test Code---------------
Declare @Id int = 7;

Declare @Name nvarchar(100) = 'something1'
		,@Component nvarchar(100) = 'something'
		,@PageTranslationId int = 1
		

		Select *
		From dbo.PageSection
		Where Id = @Id

Execute dbo.PageSection_Update	@Name
								,@Component
								,@PageTranslationId
								,@Id


		Select *
		From dbo.PageSection
		Where Id = @Id

------------------------------------*/

BEGIN

UPDATE [dbo].[PageSection]
   SET [PageTranslationId] = @PageTranslationId
      ,[Name] = @Name
      ,[Component] = @Component
 WHERE Id = @Id

END


GO
