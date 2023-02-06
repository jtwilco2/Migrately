CREATE proc [dbo].[PageSection_SelectById]
		@Id int
as

/*

	Declare @Id int = 7;

	Execute dbo.PageSection_SelectById @Id

*/

BEGIN

SELECT [Id]
      ,[PageTranslationId]
      ,[Name]
      ,[Component]
      ,[IsActive]
  FROM [dbo].[PageSection]
  WHERE Id = @Id

END


GO
